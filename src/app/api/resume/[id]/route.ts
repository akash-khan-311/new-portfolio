import { connectDB } from "@/lib/mongodb";
import Resume from "@/model/Resume";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await connectDB();

    // 1. unpublish all resumes
    await Resume.updateMany(
      {},
      {
        isPublished: false,
      },
    );

    // 2. publish selected resume
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      {
        isPublished: true,
      },
      {
        new: true,
      },
    );

    if (!updatedResume) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Resume published successfully",
        data: updatedResume,
      },
      { status: 200 },
    );
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
