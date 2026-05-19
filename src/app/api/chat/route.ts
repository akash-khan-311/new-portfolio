/* eslint-disable @typescript-eslint/no-explicit-any */

import { handlePortfolioIntent } from "@/lib/ai/handler";
import { detectIntent } from "@/lib/ai/IntentRouter";
import { handlePortfolioQuestions } from "@/lib/ai/skillMatcher";
import { SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const latest = messages[messages.length - 1]?.content?.toLowerCase() || "";

    const intent = detectIntent(latest);
    const direct = intent && handlePortfolioIntent(intent);

    if (direct) {
      return new Response(direct, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // =================================================
    // 🧠 STEP 2: STATIC QUESTION MATCHER
    // =================================================
    const matched = handlePortfolioQuestions(latest);
    if (matched) {
      return new Response(matched, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // =================================================
    // 🧠 STEP 3: RESUME SPECIAL CASE
    // =================================================
    if (latest.includes("resume") || latest.includes("cv")) {
      return new Response(
        "Resume Link: https://sie4z1povjuezbay.public.blob.vercel-storage.com/MERN%20Resume%20%2830-03-2026%29-K90j5gG8LZkptpos16s6ZcKV0LQr0l.pdf",
        {
          headers: { "Content-Type": "text/plain" },
        },
      );
    }

    // =================================================
    // 🧠 STEP 4: AI FALLBACK (ONLY GENERAL CHAT)
    // =================================================
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      stream: true,

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },

        // IMPORTANT: clean mapping (NO id, NO extra fields)
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    });

    // =================================================
    // STREAM RESPONSE
    // =================================================
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
