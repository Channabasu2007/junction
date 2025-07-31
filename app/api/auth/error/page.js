"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const errorMessages= {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The sign in link is no longer valid. Try signing in again.",
  Default: "Something went wrong. Please try again.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const errorMessage = errorMessages[error] || errorMessages["Default"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300 px-4">
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-xl p-8 max-w-md w-full text-center border border-zinc-200 dark:border-zinc-700">
        <div className="flex justify-center mb-4 text-orange-500 dark:text-orange-400">
          <AlertTriangle className="w-12 h-12 animate-bounce" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mb-2">
          Authentication Error
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">{errorMessage}</p>
        <Link
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200"
        >
          Go back to Login
        </Link>
      </div>
    </div>
  );
}
