import OpenAI from 'openai';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.NVIDIA_NIMS_API_KEY,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });

    const HOSPITALITY_SYSTEM_PROMPT = `You are SATHI (Smart Assistant for Tourism & Hospitality Innovation). You are an AI assistant exclusively designed for professionals in the tourism, hotel, restaurant, and event management industries.
Your Creator: Naveen Kumar, a passionate developer.
Tone: Warm, professional, patient. 
Knowledge Domain: Hotel Operations, F&B, Event Planning, Tourism.
Rule: YOU MUST KEEP ALL FINAL ANSWERS EXTREMELY CONCISE (3-4 SENTENCES MAX) UNLESS the user explicitly asks for details, an essay, or a full explanation. Give only the exact information requested.`;

    const completion = await openai.chat.completions.create({
      model: "deepseek-ai/deepseek-v3.2",
      messages: [
        { role: "system", content: HOSPITALITY_SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 4000,
      stream: true,
      extra_body: { "chat_template_kwargs": { "thinking": true } }
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const reasoning = chunk.choices[0]?.delta?.reasoning_content;
            const content = chunk.choices[0]?.delta?.content;
            
            if (reasoning) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'reasoning', content: reasoning })}\n\n`));
            }
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', content: content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/sathi-chat"
};
