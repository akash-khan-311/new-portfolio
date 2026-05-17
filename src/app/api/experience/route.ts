import { connectDB } from "@/lib/mongodb";
import Experience from "@/model/Experience";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Experience.find({}).lean();
  return NextResponse.json({
    success: true,
    message: "Experience Data Fetched",
    data,
  });
}

export type TExperience = {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  iconPublicId?: string;
  type: "Remote" | "On-site" | "Hybrid";
};
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      position,
      description,
      image,
      location,
      startDate,
      endDate,
      company,
      iconPublicId,
      type,
    } = body;
    if (
      !position ||
      !description ||
      !image ||
      !location ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 },
      );
    }
    const updatedAbout = await Experience.findOneAndUpdate(
      {},
      {
        position,
        description,
        image,
        location,
        startDate,
        endDate,
        company,
        iconPublicId,
        type,
      },
      {
        new: true,
        upsert: true,
      },
    );

    return NextResponse.json(updatedAbout, { status: 200 });
  } catch (error) {
    console.error("Experience update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      position,
      description,
      image,
      location,
      startDate,
      endDate,
      company,
      iconPublicId,
      type,
    } = body;
    if (
      !position ||
      !description ||
      !image ||
      !location ||
      !startDate ||
      !endDate ||
      !company ||
      !type
    ) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 },
      );
    }

    const existingExperience = await Experience.findOne({ company });
    if (existingExperience) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Experience with this company already exists.",
      });
    }
    const updatedExperience = await Experience.create({
      position,
      description,
      image,
      location,
      startDate,
      endDate,
      company,
      iconPublicId,
      type,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Experience Created Successfully",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Experience Create failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}
