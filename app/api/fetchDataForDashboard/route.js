import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    await dbConnect()
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return NextResponse.json({ error: "User not found..." }, { status: 404 })
        }
        return NextResponse.json({ user: user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Error while connecting to server.." }, { status: 500 })
    }
}
