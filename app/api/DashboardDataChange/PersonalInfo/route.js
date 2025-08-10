import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const {
      jobs,
      nickname,
      date,
      workStatus,
      hasWorkedInCompany,
      qualification,
      location,
      email,
    } = await req.json();

    // Validate required field
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        jobs,
        nickname,
        DOB: date,
        workStatus,
        hasWorkedInCompany,
        qualification,
        location,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          email: user.email,
          nickname: user.nickname,
          location: user.location,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Something went wrong while storing the data" },
      { status: 500 }
    );
  }
}
