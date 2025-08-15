import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, description, keywords, thumbnailUrl } = body.SEO || {};

    if (!body.email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email: body.email },
      {
        $set: {
          "SEO.title": title,
          "SEO.description": description,
          "SEO.keywords": keywords,
          "SEO.thumbnailUrl": thumbnailUrl,
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "SEO data saved successfully",user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving SEO data:", error);
    return NextResponse.json(
      { error: "Failed to save SEO data" },
      { status: 500 }
    );
  }
}
