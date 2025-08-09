import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong, during finding the user" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  await dbConnect();

 const { email, userName } = await req.json();

if (!email) {
  return NextResponse.json({ error: "Email is required" }, { status: 400 });
}

if (!userName) {
  return NextResponse.json({ error: "Username is required" }, { status: 400 });
}

const loweredUserName = userName.toLowerCase();

  if (!email || !userName) {
    return NextResponse.json(
      { error: "Email and username are required" },
      { status: 400 }
    );
  }

  try {
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return NextResponse.json(
        { message: "Username already exists", exists: true },
        { status: 200 }
      );
    }

const user = await User.findOneAndUpdate(
  { email },
  {userName},
  {new: true}
)
    return NextResponse.json(
      { message: "Username successfully set", success: true },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Server error while saving username" },
      { status: 500 }
    );
  }
}
