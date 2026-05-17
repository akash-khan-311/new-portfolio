import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/model/Admin";

export async function POST() {
  await connectDB();

  const existing = await Admin.findOne({ email: "admin@gmail.com" });
  if (existing) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!adminPassword) {
    return NextResponse.json(
      { message: "ADMIN_PASSWORD not defined" },
      { status: 500 },
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await Admin.create({
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  return NextResponse.json({ message: "Admin created" });
}
