import { connectDB } from "@/lib/mongodb";
import Project from "@/model/Projects";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update Project failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
      },
      { status: 500 },
    );
  }
}
