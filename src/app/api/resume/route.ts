/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/mongodb";
import Resume from "@/model/Resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const resumes = await Resume.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: resumes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch resumes",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, resumeUrl, isPublished } = body;

    if (!title || !resumeUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and resumeUrl are required",
        },
        { status: 400 },
      );
    }

    const resume = await Resume.create({
      title,
      resumeUrl,

      isPublished,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Resume uploaded successfully",
        data: resume,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("this is error from api", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload resume",
        data: error,
      },
      { status: 500 },
    );
  }
}
