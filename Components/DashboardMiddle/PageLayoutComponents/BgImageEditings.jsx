"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { Label } from "@/Components/ui/label";
import { Slider } from "@/Components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { showSuccess, showError } from "@/helpers/ToastManager";
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"

// ⚡ debounce helper
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const Control = ({ label, children, value }) => (
    <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
            <Label>{label}</Label>
            <span className="text-sm text-muted-foreground">{value}</span>
        </div>
        {children}
    </div>
);

const BgImageEditings = ({ user }) => {
    const email = user.email;
    const bgImageUrl = user?.PageLayout?.bgImage?.url || "https://images.pexels.com/photos/1031669/pexels-photo-1031669.jpeg"
    
    const [opacity, setOpacity] = useState(user?.PageLayout?.bgImage?.opacity || 50);
    const [brightness, setBrightness] = useState(user?.PageLayout?.bgImage?.brightness || 100);
    const [contrast, setContrast] = useState(user?.PageLayout?.bgImage?.contrast || 100);
    const [blur, setBlur] = useState(user?.PageLayout?.bgImage?.blur || 0);
    const [saturation, setSaturation] = useState(user?.PageLayout?.bgImage?.saturation || 100);
    const [grayscale, setGrayscale] = useState(user?.PageLayout?.bgImage?.grayscale || 0);
    const [sepia, setSepia] = useState(user?.PageLayout?.bgImage?.sepia || 0);
    const [hue, setHue] = useState(user?.PageLayout?.bgImage?.hue || 0);
    const [overlayColor, setOverlayColor] = useState(
        user?.PageLayout?.bgImage?.overlayColor || "#000000"
    );
    const [firstRun, setFirstRun] = useState(true);

    // 🔄 Save changes
    const saveChanges = async (changes) => {
        try {
            const res = await fetch("/api/DashboardDataChange/PageLayoutChanges/BgSettings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, ...changes }),
            });

            if (!res.ok) {
                showError("Unable to save changes.");
                return;
            }
            showSuccess("Background updated!");
            reloadPreview()
        } catch (err) {
            showError("Failed to update background.");
        }
    };

    const debouncedSave = useCallback(debounce(saveChanges, 300), []);

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
            return;
        }

        debouncedSave({
            opacity,
            brightness,
            contrast,
            blur,
            saturation,
            grayscale,
            sepia,
            hue,
            overlayColor,
        });
    }, [opacity, brightness, contrast, blur, saturation, grayscale, sepia, hue, overlayColor]);


    const [refreshKey, setRefreshKey] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshKey(Date.now());
        }, 1500);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-[100%] mx-auto py-6 space-y-6 text-zinc-800 dark:text-zinc-100">
            <Card className="p-6 shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl text-orange-600">
                        🎨 Background Settings
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-md">
                        {/* Background Image */}
                        {bgImageUrl ? (
                            <Image
                                src={`${bgImageUrl}?t=${refreshKey}`}
                                alt="Background preview"
                                fill
                                className="object-cover"
                                style={{
                                    filter: `
  brightness(${brightness}%)
  contrast(${contrast}%)
  blur(${blur}px)
  saturate(${saturation}%)
  grayscale(${grayscale}%)
  sepia(${sepia}%)
  hue-rotate(${hue}deg)
`,
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-900">
                                <span className="text-gray-500 text-sm">No Image</span>
                            </div>
                        )}

                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundColor: overlayColor,
                                opacity: (opacity || 50) / 100, // ✅ scale down
                            }}
                        />

                    </div>
                    {/* Grid for sliders */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Control label="Opacity" value={`${opacity}%`}>
                            <Slider value={[opacity]} onValueChange={(val) => setOpacity(val[0])} max={100} step={1} />
                        </Control>

                        <Control label="Brightness" value={`${brightness}%`}>
                            <Slider value={[brightness]} onValueChange={(val) => setBrightness(val[0])} max={200} step={1} />
                        </Control>

                        <Control label="Contrast" value={`${contrast}%`}>
                            <Slider value={[contrast]} onValueChange={(val) => setContrast(val[0])} max={200} step={1} />
                        </Control>

                        <Control label="Blur" value={`${blur}px`}>
                            <Slider value={[blur]} onValueChange={(val) => setBlur(val[0])} max={20} step={1} />
                        </Control>

                        <Control label="Saturation" value={`${saturation}%`}>
                            <Slider value={[saturation]} onValueChange={(val) => setSaturation(val[0])} max={300} step={1} />
                        </Control>

                        <Control label="Grayscale" value={`${grayscale}%`}>
                            <Slider value={[grayscale]} onValueChange={(val) => setGrayscale(val[0])} max={100} step={1} />
                        </Control>

                        <Control label="Sepia" value={`${sepia}%`}>
                            <Slider value={[sepia]} onValueChange={(val) => setSepia(val[0])} max={100} step={1} />
                        </Control>

                        <Control label="Hue Rotate" value={`${hue}°`}>
                            <Slider value={[hue]} onValueChange={(val) => setHue(val[0])} max={360} step={1} />
                        </Control>
                    </div>

                    {/* Overlay Color Picker */}
                    <div className="flex flex-col space-y-2">
                        <Label>Overlay Color</Label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={overlayColor}
                                onChange={(e) => setOverlayColor(e.target.value)}
                                className="h-10 w-16 rounded-md border cursor-pointer"
                            />
                            <span className="text-sm">{overlayColor}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BgImageEditings;
