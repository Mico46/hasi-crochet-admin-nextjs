import { del } from "@vercel/blob";
import { NextResponse } from "next/server";


export async function DELETE(request) {
  try {
    const { url } = await request.json();
 
    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    await del(url,{
     
    });

    return NextResponse.json({ message: "Blob deleted successfully" });
  } catch (error) {
    console.error('Error deleting blob:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blob' },
      { status: 500 }
    );
  }
}