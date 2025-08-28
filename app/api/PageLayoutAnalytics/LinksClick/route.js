// /app/api/click/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { userId, url } = await req.json();

  if (!userId || !url) {
    return NextResponse.json(
      { error: "Database Error" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find site inside user.sites
    const site = user.sites.find((s) => s.url === url);
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Increment + update last clicked
    site.clickCount = (site.clickCount || 0) + 1;
    site.clickedAt = new Date();

    await user.save();

    return NextResponse.json(
      { message: "Click recorded", clickCount: site.clickCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error recording click:", error);
    return NextResponse.json(
      { error: "Error recording click" },
      { status: 500 }
    );
  }
}
