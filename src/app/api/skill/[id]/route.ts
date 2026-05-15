
import { connectDB } from "@/lib/mongodb";
import Skills from "@/model/Skills";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await connectDB();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }
    const result = await Skills.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skill Deleted Successfully",
    });
  } catch (error) {
    console.error("Skill Deleted failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();

    const updatedSkill = await Skills.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Update Skill failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update skill",
      },
      { status: 500 },
    );
  }
}
