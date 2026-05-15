import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const { public_id } = body;

  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(
      `public_id=${public_id}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
    )
    .digest("hex");

  const formData = new FormData();

  formData.append("public_id", public_id);

  formData.append(
    "api_key",
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
  );

  formData.append(
    "timestamp",
    timestamp.toString()
  );

  formData.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}