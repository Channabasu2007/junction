import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**", // Use a wildcard to match any path after /s2/favicons/
      },
      {
        hostname: "res.cloudinary.com"
      },
      {
        hostname: "images.pexels.com"
      }
    ],
  },
};

export default nextConfig;