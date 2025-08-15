import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/Components/Themes/providers";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default site-wide metadata
export const metadata = {
  title: "JUNCTION - Everything You Need to Power Your Online Presence",
  description:
    "Create your complete digital presence in one link. Customize your profile, track clicks, collect feedback, and connect all your social platforms — all under your personal domain. Simple to use. Powerful in action.",
  keywords:
    "junction, link in bio, social media links, online presence, profile builder, linktree alternative",
  robots: "index, follow",
  alternates: {
    canonical: "https://junction.com", // Replace with your domain
  },
  openGraph: {
    type: "website",
    url: "https://junction.com", // Replace with your domain
    title: "JUNCTION - Everything You Need to Power Your Online Presence",
    description:
      "Create your complete digital presence in one link. Customize your profile, track clicks, collect feedback, and connect all your social platforms — all under your personal domain.",
    siteName: "JUNCTION",
    images: [
      {
        url: "https://junction.com/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "JUNCTION - Everything You Need to Power Your Online Presence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@junction", // Optional: your Twitter handle
    title: "JUNCTION - Everything You Need to Power Your Online Presence",
    description:
      "Create your complete digital presence in one link. Customize your profile, track clicks, collect feedback, and connect all your social platforms — all under your personal domain.",
    images: ["https://junction.com/og-image.jpg"], // Same as OG image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Core meta tags */}
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5"
        />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.alternates.canonical} />

        {/* Favicons & app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
