import React, { useState } from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { showError } from "@/helpers/ToastManager";
import Link from "next/link";

const SimpleStyle = ({ user }) => {
  const secondaryColor = user?.PageLayout?.ColorsPicker?.secondary ?? "#9333ea";
  const primaryColor = user?.PageLayout?.ColorsPicker?.primary ?? "#2563eb";
  const paragraphColor =
    user?.PageLayout?.ColorsPicker?.paragraph ?? "#374151";

  const [showAll, setShowAll] = useState(false);

  const handleLinkClick = async (userId, url) => {
    // Handle link click event (e.g., track analytics)
    if (!userId || !url) return;
    try {
      const response = await fech("/api/PageLayoutAnalytics/LinksClick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, url })
      })
      if (!response.ok) {
        showError("Failed to record click");
        return;
      }
    } catch (error) {
      showError("Error recording click:", error);
    }

  };

  const ShareFeature = async (url, name) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Here’s ${user.firstname}’s ${name} link. Have a look!`,
          url,
          text: user.SEO.description,
        });
      } catch (err) {
        showError("Share canceled or failed:", err);
      }
    } else {
      showError("Sharing not supported in this browser.");
    }
  };

  const sitesToShow = showAll ? user?.sites : user?.sites?.slice(0, 6);

  return (
    <div className="mt-10 px-6 mb-5">
      {/* Section Title */}
      <h1
        className="text-3xl font-bold tracking-tight mb-6 text-center"
        style={{ color: primaryColor }}
      >
        Explore My Links
      </h1>

      {/* Links Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-5 relative">
        {sitesToShow?.map((site, index) => (
          <div
            key={index}
            className="group relative flex items-center gap-4 rounded-2xl border p-4 shadow-md transition hover:scale-[1.02] hover:shadow-lg bg-opacity-20"
            style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}20` }}
          >
            {/* Favicon */}
            <div className="w-12 h-12 relative rounded-xl overflow-hidden flex-shrink-0 bg-white">
              {site.url || site.name ? (
                <Image
                  src={
                    site.url
                      ? `https://www.google.com/s2/favicons?sz=64&domain=${site.url}`
                      : `https://www.google.com/s2/favicons?sz=64&domain=${site.name.toLowerCase()}.com`
                  }
                  alt={site.name || "favicon"}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              ) : (
                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-xl" />
              )}
            </div>

            {/* Name + optional description */}
            <div
              onClick={() => { handleLinkClick(user._id, site.url) }}
              className="flex-1 min-w-0">
              <Link
                href={site.url ? site.url : "/NotFound"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h2
                  className="text-lg font-semibold truncate"
                  style={{ color: primaryColor }}
                >
                  {site.name}
                </h2>
              </Link>
            </div>

            {/* Action Icon */}
            <button
              className="flex items-center gap-2 z-10"
              onClick={() => ShareFeature(site.url, site.name)}
            >
              <Share2
                className="text-gray-500 group-hover:text-blue-500 transition font-bold "
                style={{ color: primaryColor }}
                size={24}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {user?.sites?.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 rounded-xl  font-medium shadow-md transition"
            style={{ backgroundColor: secondaryColor, color: primaryColor }}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleStyle;
