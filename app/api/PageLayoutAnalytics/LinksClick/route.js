import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const { userId, url } = await req.json();

    if (!userId || !url) {
      return NextResponse.json(
        { error: "Missing userId or url" },
        { status: 400 }
      );
    }

    // find the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // make sure sites array exists
    if (!user.sites) {
      user.sites = [];
    }

    // find site inside user.sites
    const site = user.sites.find((s) => s.url === url);

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // make sure clickHistory exists
    if (!site.clickHistory) {
      site.clickHistory = [];
    }

    // push click entry
    site.clickHistory.push({
      clickedAt: new Date(),
    });

    await user.save();

    return NextResponse.json(
      { message: "Click recorded", totalClicks: site.clickHistory.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error recording click:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
