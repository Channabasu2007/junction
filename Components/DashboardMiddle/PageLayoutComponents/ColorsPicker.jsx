"use client";
import { useState } from "react";
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"
import { Input } from "@/Components/ui/input";

export default function ColorsPicker({ user }) {
    const email = user.email
    const [primary, setPrimary] = useState(user.PageLayout?.ColorsPicker?.primary || "#2563eb");
    const [secondary, setSecondary] = useState(user.PageLayout?.ColorsPicker?.secondary || "#9333ea");
    const [paragraph, setParagraph] = useState(user.PageLayout?.ColorsPicker?.paragraph || "#374151");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const saveColors = async () => {
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("/api/DashboardDataChange/PageLayoutChanges/ColorsChange", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    primary,
                    secondary,
                    paragraph,
                }),
            });

            if (!res.ok) {
                console.error("Failed to save colors:", res.statusText);
                setStatus("error");
                return;
            }

            setTimeout(() => { reloadPreview() }, 100)

            setStatus("success");
        } catch (err) {
            console.error("Error saving colors:", err);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section class="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-8">
            <div class="text-center space-y-2">
                <h2 class="text-3xl font-extrabold text-zinc-900 dark:text-white">
                    🎨 Theme Colors
                </h2>
                <p class="text-base text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                    Personalize your profile page with a custom color palette.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300">
                    <label class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
                        Primary Color
                    </label>
                    <input
                        type="color"
                        value={primary}
                        onChange={(e) => setPrimary(e.target.value)}
                        class="w-20 h-20 rounded-xl cursor-pointer border-0 shadow-lg transform transition-all duration-300 hover:scale-105"
                    />
                    <div class="text-center mt-4">
                        <p class="text-lg font-bold" style={{ color: primary }}>
                            Primary
                        </p>
                        <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{primary}</p>
                    </div>
                </div>

                <div class="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300">
                    <label class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
                        Secondary Color
                    </label>
                    <input
                        type="color"
                        value={secondary}
                        onChange={(e) => setSecondary(e.target.value)}
                        class="w-20 h-20 rounded-xl cursor-pointer border-0 shadow-lg transform transition-all duration-300 hover:scale-105"
                    />
                    <div class="text-center mt-4">
                        <p class="text-lg font-bold" style={{ color: secondary }}>
                            Secondary
                        </p>
                        <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{secondary}</p>
                    </div>
                </div>

                <div class="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300">
                    <label class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
                        Paragraph Color
                    </label>
                    <input
                        type="color"
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                        class="w-20 h-20 rounded-xl cursor-pointer border-0 shadow-lg transform transition-all duration-300 hover:scale-105"
                    />
                    <div class="text-center mt-4">
                        <p class="text-lg font-bold" style={{ color: paragraph }}>
                            Paragraph
                        </p>
                        <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{paragraph}</p>
                    </div>
                </div>
            </div>

            <div class="mt-8 py-6 rounded-xl bg-zinc-100 dark:bg-zinc-900 grid grid-cols-3 items-center">
                <p class="text-base text-center font-bold" style={{ color: primary }}>
                    Primary Text
                </p>
                <p class="text-sm text-center font-medium" style={{ color: secondary }}>
                    Secondary Text
                </p>
                <p class="text-sm text-center" style={{ color: paragraph }}>
                    Paragraph Text
                </p>
            </div>

            <div class="flex flex-col items-center space-y-4 pt-4">
                <button
                    onClick={saveColors}
                    disabled={loading}
                    class={`px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 
        ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 hover:shadow-lg"}
      `}
                >
                    {loading ? "Saving..." : "Save Colors"}
                </button>

                {status === "success" && (
                    <p class="text-center text-green-600 text-sm flex items-center gap-2">
                        <span class="text-lg">✅</span> Colors saved successfully!
                    </p>
                )}
                {status === "error" && (
                    <p class="text-center text-red-600 text-sm flex items-center gap-2">
                        <span class="text-lg">❌</span> Failed to save colors. Please try again.
                    </p>
                )}
            </div>
        </section>
    );
}
