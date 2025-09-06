import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"

export async function POST(req) {
    const body = await req.json()
    const { userName, message, category } = body;

    if (!message || message.trim() === "") {
        return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }
    if (!userName || userName.trim() === "") {
        return NextResponse.json({ error: "User name cannot be empty." }, { status: 400 });
    }

    try {
        await dbConnect();
    } catch (error) {
        return NextResponse.json({ error: "Database connection error." }, { status: 500 });
    }
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }
        user.messages.push({ content: message, category, createdAt: new Date() });
        await user.save();
    } catch (error) {
        return NextResponse.json({ error: "Error saving message." }, { status: 500 });
    }
    return NextResponse.json({ status: 200 }, { message: "Your message recieved successfully." })
}