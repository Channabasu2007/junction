"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const errorMessages = {
  Configuration: "We're experiencing server configuration issues. Please try again later.",
  AccessDenied: "You don’t have permission to sign in. Please contact support if you believe this is an error.",
  Verification: "Your sign-in link is no longer valid. Please try signing in again.",
  Default: "An unexpected error occurred. Please try again shortly.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const errorMessage = errorMessages[error] || errorMessages["Default"];

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-5 text-orange-500 dark:text-orange-400 animation-ping">
          <AlertTriangle className="w-14 h-14 animate-bounce" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Authentication Failed
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mb-2">
          If you were trying to log in using Google, please make sure you’ve already created an account on <strong>JUNCTION</strong>.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 italic">{errorMessage}</p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full font-medium transition-colors duration-200"
          >
            Back to Login
          </Link>
          <Link
            href="/contact"
            className="border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-700 py-2 px-6 rounded-full font-medium transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
