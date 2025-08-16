// app/api/fetchDataForDashboard/route.js

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const userName = searchParams.get("userName");

    if (!email && !userName) {
        return NextResponse.json({ error: "Missing 'email' or 'userName' parameter" }, { status: 400 });
    }

    await dbConnect();

    try {
        const user = await User.findOne({
            $or: [{ email: email }, { userName: userName }],
        }).lean();

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json({ user: user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error while connecting to server." }, { status: 500 });
    }
}