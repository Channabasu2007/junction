import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { email, msgId } = await req.json();
    if (!email || !msgId) {
      return NextResponse.json({ message: "Missing email or msgId" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { messages: { _id: msgId } } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
