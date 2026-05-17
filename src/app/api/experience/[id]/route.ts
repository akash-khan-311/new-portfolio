import { connectDB } from "@/lib/mongodb";
import Experience from "@/model/Experience";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();

    const updatedExperience = await Experience.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Experience updated successfully",
      experience: updatedExperience,
    });
  } catch (error) {
    console.error("Update Experience failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update experience",
      },
      { status: 500 },
    );
  }
}