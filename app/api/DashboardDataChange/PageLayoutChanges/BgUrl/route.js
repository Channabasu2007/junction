import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    // 1. Get email and URL from the request body
    const { email, url } = await req.json();

    if (!email || !url) {
      return NextResponse.json(
        { error: "Email and URL are required." },
        { status: 400 }
      );
    }

    // 2. Update only the background image URL
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { "PageLayout.bgImage.url": url } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // 3. Success response
    return NextResponse.json(
      { message: "Background image URL saved successfully.", url: updatedUser.PageLayout.bgImage.url },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating background image:", error);
    return NextResponse.json(
      { error: "Failed to save background image URL due to a server error." },
      { status: 500 }
    );
  }
}
