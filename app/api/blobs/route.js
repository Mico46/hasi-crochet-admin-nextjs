import { list, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
   /*  const token = process.env.BLOB_READ_WRITE_TOKEN;

    // Debug log to check if Next.js sees your token
    console.log("Token present:", !!token);

    if (!token) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN is missing in .env.local" },
        { status: 400 }
      );
    } */

    const response = await list({
       // Explicitly pass the token here
      prefix: 'uploads/',
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blobs:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blobs' },
      { status: 500 }
    );
  }
}
