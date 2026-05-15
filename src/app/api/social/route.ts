import { connectDB } from "@/lib/mongodb";
import Social from "@/model/Social";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const data = await Social.findOne({}).lean();

  return NextResponse.json({
    success: true,
    data,
  });
}

export async function PUT(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const { socials } = body;

  if (!socials) {
    return NextResponse.json({
      success: false,
      message: "Socials required",
    });
  }

  const updated = await Social.findOneAndUpdate(
    {},
    { socials },
    { new: true, upsert: true },
  );

  return NextResponse.json({
    success: true,
    message: "Updated successfully",
    data: updated,
  });
}
