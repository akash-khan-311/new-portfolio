import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/model/Hero";

export async function GET() {
  await connectDB();
  const data = await Hero.findOne({}).lean();
  return NextResponse.json({
    success: true,
    message: "Hero Data Fetched",
    data,
  });
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { heading, gradientTitle, description } = body;
    if (!heading || !gradientTitle || !description) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 },
      );
    }
    const updatedHero = await Hero.findOneAndUpdate(
      {},
      {
        heading,
        gradientTitle,
        description,
      },
      {
        new: true,
        upsert: true,
      },
    );

    return NextResponse.json(updatedHero, { status: 200 });
  } catch (error) {
    console.error("Hero update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}
