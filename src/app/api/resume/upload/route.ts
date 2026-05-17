import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        { success: false, message: "No file" },
        { status: 400 },
      );
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
      allowOverwrite: false,
      contentType: "application/pdf",
    });

    return Response.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
}
