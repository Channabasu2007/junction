import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ensure this file exports authOptions
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req) {
  await dbConnect(); // ✅ Ensure DB is connected

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const email = session.user.email;
  const { id: videoId } = await req.json();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { videoId },
      { new: true }
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true} ), { status: 200 });
  } catch (error) {
    console.error("DB Error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
