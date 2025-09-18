import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // assuming you have this component
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import { reloadPreview } from "@/components/DesignedPages/MobilePreview"

const SocialMedia = ({ user }) => {
  const email = user.email
  const [firstRun, setFirstRun] = useState(true)
  const [sites, setSites] = useState(
    user?.sites && user.sites.length > 0
      ? user.sites
      : [{ name: "", url: "" }]
  );

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false)
      return;
    }
    debouncedSave({ sites, email })
  }, [sites])

  const saveData = async (data) => {
    try {
      const res = await fetch('/api/DashboardDataChange/SocialMediaLinks', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (!res.ok) { showError("The data is not saved, please try again later. Check if the internet connection is good or not.") }
reloadPreview()
    } catch (error) {
      showError("Something went wrong, please try again later to add the links.")
    }
  }

  const debouncedSave = useCallback(
    debounce(saveData, 1500),
    [] // The empty dependency array ensures this function is only created once
  );

  const handleSiteChange = (index, field, value) => {
    const updatedSites = [...sites];
    updatedSites[index][field] = value;
    setSites(updatedSites);
  };

  const addSite = () => {
    setSites([...sites, { name: "", url: "" }]);
  };

  const removeSite = (index) => {
    if (sites.length === 1) return; // prevent removing last item
    const updatedSites = sites.filter((_, i) => i !== index);
    setSites(updatedSites);
  };

  function debounce(func, delay) {
    let timeoutId; // This variable will hold the ID of the setTimeout

    return function (...args) {
      // Clear any existing timeout to reset the timer
      clearTimeout(timeoutId);

      // Set a new timeout
      timeoutId = setTimeout(() => {
        // Execute the original function with the correct 'this' context and arguments
        func.apply(this, args);
      }, delay);
    };
  }

  return (
    <div className="w-[90%] mx-auto mb-10 py-6 mt-2 space-y-10 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">Social Media Links</h1>

      {sites.map((site, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border border-zinc-300 dark:border-zinc-700 rounded-lg p-4"
        >
          <div className="w-12 h-12 relative rounded-3xl overflow-hidden flex-shrink-0">
            {site.url || site.name ? (
              <Image
                src={site.url ? `https://www.google.com/s2/favicons?sz=64&domain=${site.url}` : `https://www.google.com/s2/favicons?sz=64&domain=${site.name.toLowerCase()}.com`}
                alt={site.name || "favicon"}
                fill
                sizes="48px"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-3xl" />
            )}
          </div>

          <Input
            placeholder="Name of the site"
            value={site.name}
            onChange={(e) => handleSiteChange(index, "name", e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Link of your page"
            value={site.url}
            onChange={(e) => handleSiteChange(index, "url", e.target.value)}
            className="flex-2"
          />

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeSite(index)}
              disabled={sites.length === 1}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Remove
            </Button>
            {index === sites.length - 1 && (
              <Button size="sm" onClick={addSite} className="border-green-600 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white font-medium cursor-pointer  dark:bg-zinc-800 text-white transition">
                Add
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
