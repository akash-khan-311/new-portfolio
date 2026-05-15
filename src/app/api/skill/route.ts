import { connectDB } from "@/lib/mongodb";
import Skills from "@/model/Skills";
import { NextResponse } from "next/server";

// GET ALL SKILLS
export async function GET() {
  try {
    await connectDB();

    const data = await Skills.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Skills fetched successfully",
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
    const existingSkill = await Skills.findOne({
      name: body.name,
    });
    if (existingSkill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill already exists",
        },
        { status: 400 },
      );
    }
    const skill = await Skills.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Skill created successfully",
        skill,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create skill",
        error,
      },
      { status: 500 },
    );
  }
}
