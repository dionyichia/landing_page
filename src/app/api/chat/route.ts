import { streamText, UIMessage, convertToModelMessages, embed, cosineSimilarity, generateText, Output } from 'ai';
import embeddings from "@/knowledge/notion_embeddings.json"
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const MAX_PROMPT_CHARS = 2000;
const MAX_MESSAGES = 16;

// Only take chunk above thresholds confidence 
const MIN_THRESHOLD = 0.275;

// Retrieve top 3 chunks
const K = 5;

type Chunk = {
  score: number;
  sourceQuery: string;
  chunk_id: string;
  title: string;
  text: string;
  embedding: number[];
  text_hash: string;
};

export async function POST(req: Request) {
    const {
        messages,
        chat_model,
        embedding_model,
        query_expansion_model,
    }: { 
        messages: UIMessage[]; 
        chat_model: string; 
        embedding_model: string;
        query_expansion_model: string;
    } = await req.json();

    // Security Limits
    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error('Invalid messages');
    }

    if (messages.length > MAX_MESSAGES) {
        throw new Error('Too many messages');
    }

    // 1. Convert UI messages
    const modelMessages = await convertToModelMessages(messages);

    // 2. Extract latest user text
    const lastUserMessage = [...messages]
        .reverse()
        .find(m => m.role === 'user');

    if (!lastUserMessage) {
        throw new Error('No user message found');
    }

    const userText = lastUserMessage.parts
        .filter(p => p.type === 'text')
        .map(p => p.text)
        .join(' ');

    if (userText.length > MAX_PROMPT_CHARS) {
        throw new Error('Prompt too long');
    }
    
    // 3. Expand user query
    const schema = z.array(z.string()).min(3).max(5);

    const expandedQueryResult = await generateText({
        model: query_expansion_model,
        prompt: 
            `
            You help retrieve information about a person from a small personal knowledge base.

            Given the user's question, generate 3 to 4 short search queries that capture different plausible intents.
            Each query should be concise (max ~12 words).
            Use terminology likely to appear in resumes or project descriptions.

            Return each query as a string in a List. No extra text.

            Example OUPUT: 
            ["Dion summer internship experience", "Dion DSO GPU work", "Dion professional experience"]

            User question:
            ${userText}

            Search queries:
            `,
        output: Output.object({ schema }),
    });

    // 3.5 Validate new Queries, else default to user query
    const newQueries: string[] =
        Array.isArray(expandedQueryResult.output) && expandedQueryResult.output.length > 0
            ? expandedQueryResult.output
            : [userText];
    
    newQueries.forEach((query) => {
        console.log("Query: ", query)
    })

    // 4. Embed each expanded query
    const queryEmbeddings = await Promise.all(
        newQueries.map(async (query) => {
            const { embedding } = await embed({
            model: embedding_model,
            value: query,
            });
            return { query, embedding };
        })
    );

    // 5. Similarity search (cosine)
    const perQueryResults = queryEmbeddings.map(({ query, embedding }) => {
    const results = embeddings
        .map(chunk => ({
        ...chunk,
        score: cosineSimilarity(embedding, chunk.embedding),
        sourceQuery: query,
        }))
        .filter(chunk => chunk.score >= MIN_THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .slice(0, K);

    return results;
    });
    
    // 5.1 Merge results
    const mergedResults = perQueryResults.flat();

    // 5.2 Deduplicate by chunk_id (keep highest score)
    const dedupedMap = new Map<string, Chunk>();

    for (const chunk of mergedResults) {
    const existing = dedupedMap.get(chunk.chunk_id);
    if (!existing || chunk.score > existing.score) {
        dedupedMap.set(chunk.chunk_id, chunk);
    }
    }

    const dedupedResults = Array.from(dedupedMap.values());

    // Global re-rank + final TopK
    const topK = dedupedResults
    .sort((a, b) => b.score - a.score)
    .slice(0, K);

    // Build context with logging
    console.log('=== RETRIEVAL METRICS ===');
    console.log('Query:', userText);
    console.log('Number of chunks retrieved:', topK.length);
    console.log('\nTop K Results:');
    topK.forEach((chunk, idx) => {
        console.log(`\n[${idx + 1}] Score: ${chunk.score.toFixed(4)}`);
        console.log(`    Title: ${chunk.title}`);
        console.log(`    Chunk ID: ${chunk.chunk_id}`);
        console.log(`    Preview: ${chunk.text.substring(0, 100)}...`);
    });
    console.log('Score range:', topK[0]?.score, 'to', topK[topK.length-1]?.score);
    console.log('\n=== END METRICS ===\n');

    let context = ""

    if (topK.length === 0 || topK[0].score < MIN_THRESHOLD) {
        // No good context found - return helpful fallback
        context = "No good context found"
    } else {

        // Build context
        context = topK
            .map(c => `• ${c.text}`)
            .join('\n');
    }

    // Call LLM with RAG context
    const result = streamText({
        model: chat_model,
        system: 
            `
            You are Dion, answering questions about yourself in first person.
            Assume the user may be evaluating Dion for internships, engineering roles, or product roles.

            Use ONLY the relevant information from the provided context.
            If something is NOT stated in the context, respond warmly and direct them to:
            - LinkedIn: https://www.linkedin.com/in/dionyichia/
            - Blog/Portfolio: yourblog.com
            
            Say something like: "I don't have that specific information in my knowledge base, but you can find more on my LinkedIn [https://www.linkedin.com/in/dionyichia/] or blog [yourblog.com], or feel free to reach out directly!"

            ${context ? `Context:\n${context}` : 'NO CONTEXT PROVIDED - use fallback response'}

            Style guidelines:
            - Answer naturally, like a thoughtful engineering student
            - Use first person ("I")
            - Keep replies concise and warm
            - Format your replies for readability

            Question:
            ${userText}

            Context:
            ${context}
            `,
        messages: modelMessages,
    });

    // send sources and reasoning back to the client
    return result.toUIMessageStreamResponse({
        sendSources: true,
        sendReasoning: true,
    });
}
