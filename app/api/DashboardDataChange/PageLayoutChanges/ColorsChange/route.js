import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // your mongoose connect utility
import User from "@/models/User";        // your user model

// POST /api/colors
export async function POST(req) {
  try {
    await dbConnect();

    const { email, primary, secondary, paragraph } = await req.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    // update the user by email
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          "PageLayout.ColorsPicker.primary": primary,
          "PageLayout.ColorsPicker.secondary": secondary,
          "PageLayout.ColorsPicker.paragraph": paragraph,
        },
      },
      { new: true } // return updated doc
    );

    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      message: "Colors updated successfully",
      colors: user.PageLayout.ColorsPicker,
    });
  } catch (error) {
    console.error("Error updating colors:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
