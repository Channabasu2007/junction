import React, { useEffect, useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"
const VideoEmbedding = ({user}) => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(user.videoId ||"");

  const extractVideoId = (link) => {
    try {
      const urlObj = new URL(link);
      if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v");
      }
      if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.slice(1);
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleChange = (e) => {
    const link = e.target.value;
    setUrl(link);
    setVideoId(extractVideoId(link) || "");
  };

  const saveData = async (Id) => {
    
    const res = await fetch('/api/DashboardDataChange/VideoIdInfo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ id: Id })
    });

    if (!res.ok) {
      showError("Something went wrong");
    } else {
      showSuccess("Video added successfully.");
      reloadPreview()
    }
  };

  // Debounce saving so we don't spam requests
  useEffect(() => {
    if (!videoId) return;
    const timeout = setTimeout(() => saveData(videoId), 800);
    return () => clearTimeout(timeout);
  }, [videoId]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 space-y-6 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">Video Spotlight</h1>

      <div className="space-y-2">
        <Label className="text-sm font-medium">YouTube Video Link</Label>
        <Input
          className="mt-1 border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-orange-500"
          placeholder="Paste your YouTube link here"
          value={url}
          onChange={handleChange}
        />
      </div>

      <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg border border-zinc-300 dark:border-zinc-700">
        {videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
            Video preview will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoEmbedding;
