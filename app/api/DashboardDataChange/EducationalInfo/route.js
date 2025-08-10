import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const {
    primarySchool,
    secondarySchool,
    highSchool,
    college,
    qualifications,
    showEducation,
    email,
  } = await req.json();

  if(!email){
    return new Response("Email is required", {status: 406})
  }
  const user = await User.findOneAndUpdate(
    { email },
    {
      primarySchool,
      secondarySchool,
      highSchool,
      college,
      qualifications,
      showEducation,
    },
    { new: true }
  );
  if(!user){
    return new Response("User not found", { status: 404 });
  }
  return new Response("Education updated successfully", { status: 200 });
}
