// app/api/resume/published/route.ts


import { connectDB } from "@/lib/mongodb";
import Resume from "@/model/Resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const resume = await Resume.findOne({
      isPublished: true,
    });

    return NextResponse.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch published resume",
      },
      { status: 500 },
    );
  }
}