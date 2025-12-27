import { streamText, UIMessage, convertToModelMessages, embed, cosineSimilarity } from 'ai';
import embeddings from "@/knowledge/notion_embeddings.json"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Retrieve top 3 chunks
export const K = 3;

export async function POST(req: Request) {
    const {
        messages,
        model,
        webSearch,
    }: { 
        messages: UIMessage[]; 
        model: string; 
        webSearch: boolean;
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

      // 6. Call LLM with RAG context
    const result = streamText({
        model,
        system: 
            `
            You are Dion, answering questions about yourself.
            Only use the information below.
            If the answer is not present, say you dont know.

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