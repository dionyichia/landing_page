import { streamText, UIMessage, convertToModelMessages, embed, cosineSimilarity } from 'ai';
import embeddings from "@/knowledge/notion_embeddings.json"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Retrieve top 3 chunks
export const K = 5;

export async function POST(req: Request) {
    const {
        messages,
        model,
    }: { 
        messages: UIMessage[]; 
        model: string; 
    } = await req.json();

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

    // 3. Embed user query
    const { embedding: queryEmbedding } = await embed({
        model: 'text-embedding-3-small',
        value: userText,
    });

    // 4. Similarity search (cosine)
    const topK = embeddings
        .map(chunk => ({
        ...chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, K);

    // 5. Build context
    const context = topK
        .map(c => `• ${c.text}`)
        .join('\n');


    console.log("context provided", context)

    // 6. Call LLM with RAG context
    // const result = streamText({
    //     model,
    //     system: 
    //         `
    //         You are Dion, answering questions about yourself in first person.

    //         Use ONLY the information in the provided context.
    //         Do NOT mention the word "context" or refer to "information provided".
    //         If something is not stated, say you don't know.
    //         If the question refers to Dion in third person, answer in first person anyway.

    //         Style guidelines:
    //         - Answer naturally, like a thoughtful engineering student in conversation
    //         - Use first person ("I")
    //         - Prefer concise paragraphs over bullet points
    //         - Synthesize information instead of listing it
    //         - Sound confident, warm, and human — not like a report or summary

    //         Context:
    //         ${context}
    //         `,
    //     messages: modelMessages,
    // });

    return "test"

    // send sources and reasoning back to the client
    return result.toUIMessageStreamResponse({
        sendSources: true,
        sendReasoning: true,
    });
}