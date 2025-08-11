import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { sites, email } = await req.json();
  if (!email) {
    return;
  }
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { sites },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ error: "User Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Data stored"}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while saving the data" },
      { status: 500 }
    );
  }
}
