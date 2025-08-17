import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Slider } from "@/Components/ui/slider"
import { showSuccess, showError } from "@/helpers/ToastManager";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"

const BgImageSelection = ({ user }) => {
const [bgImageUrl, setBgImageUrl] = useState(
  user?.PageLayout?.bgImage?.url || "https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg"
);

    const email = user.email
    const [queryImages, setQueryImages] = useState(null)
    const [query, setQuery] = useState("")
    const [firstRun, setFirstRun] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false)
            return
        }

        debouncedSave(query)
    }, [query])

    useEffect(() => {
        if (firstRun) return
        changeBgImage(bgImageUrl)
    }, [bgImageUrl])

    const changeBgImage = async (url) => {
        try {
            const res = await fetch("/api/DashboardDataChange/PageLayoutChanges/BgUrl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, url })
            })
            if (!res.ok) {
                showError("Unable to store the new image, please try again.")
                return
            }
            reloadPreview()
            showSuccess("Image Saved successfully.")
            return
        } catch (error) {
            showError("Background image not changed, check internet connection")
        }
    }

    const getImages = async (ques) => {

        try {
            const res = await fetch(`/api/DashboardDataChange/ImageFetcher?query=${encodeURIComponent(ques)}`);

            if (!res.ok) {
                setError(`Failed to fetch photos: ${res.status} ${res.statusText}`);
                return;
            }

            const data = await res.json();
            console.log(data)
            if (!data.photos || data.photos.length === 0) {
                setError("No images found for your query.");
                return;
            }

            setError(null);
            setQueryImages(data.photos);

        } catch (error) {
            setError("Connection failed. Please check your internet connection.");
        }
    };

    const debouncedSave = useCallback(
        debounce(getImages, 1000),
        []
    );

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }


    return (
        <>

            <div className="max-h-[60vh] w-full  transform translate-2 transition-transform">
                {/* Input for the background Image */}
                <div className="space-y-2">
                    <Label
                        htmlFor="queryBox"
                        className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                    >
                        Background Image Search
                    </Label>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Enter a keyword or short description to find the perfect background image.
                    </p>
                    <Input
                        id="queryBox"
                        placeholder="e.g., City skyline at night"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                </div>

                {/* Images preview */}
                {queryImages !== null && (
                    <div className="mt-4   h-[300px] overflow-y-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {queryImages.map((image, i) => (
                                <div
                                    key={i + image.url}
                                    className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700"
                                    onClick={() => setBgImageUrl(image.src.large2x || image.src.original)}
                                >
                                    <Image
                                        src={image.src.medium}
                                        alt={image.alt || `Image ${i + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BgImageSelection