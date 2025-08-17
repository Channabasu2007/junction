import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, ...bgImage } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          "PageLayout.bgImage.opacity": bgImage.opacity,
          "PageLayout.bgImage.brightness": bgImage.brightness,
          "PageLayout.bgImage.contrast": bgImage.contrast,
          "PageLayout.bgImage.hue": bgImage.hue,
          "PageLayout.bgImage.saturation": bgImage.saturation,
          "PageLayout.bgImage.sepia": bgImage.sepia,
          "PageLayout.bgImage.overlayColor": bgImage.overlayColor,
          "PageLayout.bgImage.grayscale": bgImage.grayscale,
          "PageLayout.bgImage.blur": bgImage.blur,
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data stored successfully", user },
      { status: 200 }
    );
  } catch (err) {
    console.error("BgSettings Save Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
