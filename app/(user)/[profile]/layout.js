// app/[profile]/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/Components/Themes/providers";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { notFound, redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔹 Fetch user from DB
async function getUser(profile) {
  await dbConnect();
  try {
    const user = await User.findOne({ userName: profile }).lean();
    if (!user) return null;
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

// 🔹 Dynamic Metadata
export async function generateMetadata({ params }) {
  const paramsData = await params
  const profile = await paramsData.profile;
  const user = await getUser(profile);
  if (!user)
    return {
      title: "User Not Found | JUNCTION",
      description: "Profile not found on JUNCTION",
    };

  const description =
    user.SEO?.description ||
    user.bio ||
    `View ${user.firstname} ${user.lastname}'s profile on JUNCTION.`;

  return {
    title:
      user.SEO?.title ||
      `${user.firstname} ${user.lastname} - ${user.userName}`,
    description : description,
    keywords: user.SEO?.keywords || ["junction", "profile", user.userName],
    robots: "index, follow",
    alternates: {
      canonical: `https://junction.com/${user.userName}`,
    },
    openGraph: {
      title: user.SEO?.title || `${user.firstname} ${user.lastname}`,
      description,
      images: [
        {
          url: user.SEO?.thumbnailUrl || user.profileUrl || "/default-og.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: user.SEO?.title || `${user.firstname} ${user.lastname}`,
      description,
      images: [user.SEO?.thumbnailUrl || user.profileUrl || "/default-og.png"],
    },
  };
}

// 🔹 Layout
export default async function UserLayout({ children, params }) {
  const paramsData = await params
  const profile = await paramsData.profile;
  const user = await getUser(profile);

  if (!user) {
    redirect("/NotFound");
  }

  if (!user.verified) {
    redirect("/");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicons & app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: `${user.firstname} ${user.lastname}`,
              url: `https://junction.com/${user.userName}`,
              image: user.profileUrl,
              sameAs: [
                `https://twitter.com/${user.userName}`,
                `https://github.com/${user.userName}`,
              ],
              jobTitle: "Creator at JUNCTION",
              description: user.bio,
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
