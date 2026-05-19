import pdf from "pdf-parse";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File;

    if (!file) {
      return Response.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const data = await pdf(buffer);

    return Response.json({
      text: data.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to parse PDF",
      },
      {
        status: 500,
      }
    );
  }
}