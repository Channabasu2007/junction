import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Themes/providers"; // Import the new Providers component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JUNCTION - Everything You Need to Power Your Online Presence",
  description: "Create your complete digital presence in one link. Customize your profile, track clicks, collect feedback, and connect all your social platforms — all under your personal domain. Simple to use. Powerful in action.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}