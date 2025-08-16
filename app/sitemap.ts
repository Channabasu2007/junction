import type { MetadataRoute } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL?.replace(/\/+$/, "") || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // static pages
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  // dynamic profile slugs: /(user)/[profile] -> URL is /:profile
  try {
    await dbConnect();
    const users = await User.find(
      { verified: true },               // only index verified profiles
      { userName: 1, updatedAt: 1, createdAt: 1 }
    ).lean();

    const userEntries: MetadataRoute.Sitemap = users
      .filter(u => typeof u.userName === "string" && u.userName.trim().length > 0)
      .map(u => ({
        url: `${BASE_URL}/${u.userName}`,
        lastModified: (u.updatedAt as Date) || (u.createdAt as Date) || now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    return [...staticEntries, ...userEntries];
  } catch (err) {
    console.error("sitemap generation failed, returning static only:", err);
    // don’t break the route — still return static entries
    return staticEntries;
  }
}
