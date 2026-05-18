import { connectDB } from "@/lib/mongodb";
import Info from "@/model/Info";
import { NextResponse } from "next/server";

// GET ALL SKILLS
export async function GET() {
  try {
    await connectDB();

    const data = await Info.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Info Data fetched successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skills",
        error,
      },
      { status: 500 },
    );
  }
}

// CREATE SKILL
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, phone, email, location } = body;
    const existingInfo = await Info.findOne({
      name,
      phone,
      email,
      location,
    });
    if (existingInfo) {
      return NextResponse.json(
        {
          success: false,
          message: "Info already exists",
        },
        { status: 400 },
      );
    }
    const info = await Info.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Information created successfully",
        info,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create info",
        error,
      },
      { status: 500 },
    );
  }
}
