"use client"

import { ThemeProvider } from "@/components/Themes/theme-provider";
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "next-auth/react"; // Correct import for App Router

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ToastContainer richColors position="top-center" />
      </ThemeProvider>
    </SessionProvider>
  );
}