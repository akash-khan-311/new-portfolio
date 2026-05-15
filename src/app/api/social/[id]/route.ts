import { TSocial } from "@/interface";
import { connectDB } from "@/lib/mongodb";
import Social from "@/model/Social";

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
    const result = await Social.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Social Link not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Social Link Deleted Successfully",
    });
  } catch (error) {
    console.error("Social Link Deleted failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();
    const { name, icon }: TSocial = body;

    if (!name || !icon) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const updatedExperience = await Social.findByIdAndUpdate(
      id,
      { name, icon },
      { new: true },
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { success: false, message: "Social Link not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Social Link updated",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Update Social Link failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
