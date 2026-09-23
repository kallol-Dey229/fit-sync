import { NextResponse } from "next/server";

import { getAllClass } from "@/lib/api/classes";
import { getAllTrainers } from "@/lib/api/trainers";

const MAX_MESSAGE_LENGTH = 500;
const MODEL = "openai/gpt-4o-mini";

export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "A message is required." }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "The assistant is not configured yet." }, { status: 503 });
    }

    const [classResponse, trainerResponse] = await Promise.all([
      getAllClass(),
      getAllTrainers(),
    ]);
    const classes = Array.isArray(classResponse) ? classResponse : [];
    const trainers = Array.isArray(trainerResponse) ? trainerResponse : [];

    const publicContext = {
      classes: classes.slice(0, 40).map((item) => ({
        title: item.title,
        category: item.category,
        difficulty: item.difficulty,
        duration: item.duration,
        price: item.price,
        trainerName: item.trainerName,
        description: item.description,
        totalBookings: item.totalBookings,
      })),
      trainers: trainers.slice(0, 40).map((item) => ({
        name: item.name,
        specialty: item.specialty,
        students: item.students,
      })),
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.BETTER_AUTH_URL || "http://localhost:3000",
        "X-Title": "FitSync Assistant",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content: `You are FitSync's friendly fitness website assistant. Help visitors understand the website and choose classes or trainers using only the supplied catalog. Be concise, practical, and honest. Never invent prices, schedules, trainers, features, or availability. If the catalog does not contain an answer, say so and suggest visiting the relevant page. You can explain that classes can be explored from the All Classes page and trainers from the All Trainers page. Catalog context: ${JSON.stringify(publicContext)}`,
          },
          { role: "user", content: message },
        ],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("Assistant provider error:", response.status);
      return NextResponse.json({ error: "The assistant is temporarily unavailable." }, { status: 502 });
    }

    const result = await response.json();
    const answer = result?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json({ error: "The assistant could not prepare a response." }, { status: 502 });
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Assistant route error:", error);
    return NextResponse.json({ error: "The assistant is temporarily unavailable." }, { status: 500 });
  }
}