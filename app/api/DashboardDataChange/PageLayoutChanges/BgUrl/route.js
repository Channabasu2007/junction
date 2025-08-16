import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();

        // 1. Get email and URL from the request body
        const { email, url } = await req.json();

        if (!email || !url) {
            return NextResponse.json(
                { error: "Email or URL is missing." },
                { status: 400 }
            );
        }

        // 2. Find the user by email and update the bgImage
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $set: { "PageLayout.bgImage": url } }, // Use $set to update a nested field
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        // 3. Handle case where user is not found
        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 }
            );
        }

        // 4. Return a success response
        return NextResponse.json(
            { message: "Background image updated successfully.", user: updatedUser },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating background image:", error);
        return NextResponse.json(
            { error: "Failed to update background image due to a server error." },
            { status: 500 }
        );
    }
}