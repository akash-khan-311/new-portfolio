import bcrypt from "bcryptjs";
import Admin from "@/model/Admin";

export async function seedAdmin() {
  const existingAdmin = await Admin.findOne({
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  });

  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash(
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string,
    10
  );

  await Admin.create({
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin seeded successfully");
}