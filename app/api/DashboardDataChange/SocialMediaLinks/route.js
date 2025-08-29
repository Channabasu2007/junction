import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, sites } = body

    if (!email || !sites) {
      return NextResponse.json(
        { error: "Email and sites are required" },
        { status: 400 }
      )
    }

    await dbConnect()

    const user = await User.findOneAndUpdate(
      { email },
      { sites },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Sites updated successfully", user },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving sites:", error)
    return NextResponse.json(
      { error: "Server error while saving sites" },
      { status: 500 }
    )
  }
}
