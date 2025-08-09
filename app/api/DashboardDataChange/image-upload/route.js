import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    
    // Parse the request body
    const { type, url, email } = await req.json();
    
    // Find the user by their email
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Create an update object based on the type
    let updateObject = {};
    if (type === "profile") {
      updateObject = { profileUrl: url };
    } else if (type === "banner") {
      updateObject = { bannerUrl: url };
    } else {
      return NextResponse.json({ error: "Invalid type provided" }, { status: 400 });
    }

    // Update the user document and return the new document
    user = await User.findOneAndUpdate({ email }, updateObject, { new: true });
    
    // Send a success response back to the client
    return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
