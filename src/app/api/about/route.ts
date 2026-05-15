


import { TAbout } from "@/interface";
import { connectDB } from "@/lib/mongodb";
import About from "@/model/About";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
 await connectDB();;
  const data = await About.findOne({}).lean();
  return NextResponse.json({
    success: true,
    message: "About Data Fetched",
    data,
  });
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { heading,title,image, imagePublicId, description } : TAbout = body;
    if (!heading || !title || !image || !imagePublicId || !description) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 }
      );
    }
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        heading,
        title,
        image,
        imagePublicId,
        description,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(updatedAbout, { status: 200 });
  } catch (error) {
    console.error("About update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}