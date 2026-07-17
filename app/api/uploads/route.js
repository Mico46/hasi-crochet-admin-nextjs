import { handleUpload,put } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    /* const body = await request.text();
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
          ],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("uploaded:", blob.url);
      },
    }); */

const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
 
  const blob = await put(filename, request.body, {
    access: 'public' /* or 'public' */,
    addRandomSuffix: true,
  });
    return NextResponse.json(blob);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
