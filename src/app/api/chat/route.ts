/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { portfolioContext } from "@/lib/ai/portfolioContext";

import { SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";
import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }

    // Clean + safe latest message 
    const latest = messages[messages.length - 1]?.content?.toLowerCase() || "";

    // GROQ STREAM COMPLETION
    const userMessages: ChatCompletionMessageParam[] = messages.map(
      (m: any) =>
        ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content || ""),
        }) as ChatCompletionMessageParam,
    );

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      stream: true,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT + "\n\n" + portfolioContext,
        },

        ...userMessages,
      ],
    });

    // Stream response back to client
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("API Error:", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
