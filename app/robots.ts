import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL?.replace(/\/+$/, "") || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        // block private/utility areas
        disallow: [
          "/api",
          "/auth",
          "/Dashboard",
          "/Analytics",
          "/SetPageName",
          "/NotFound",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
