import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { showSuccess, showError } from "@/helpers/ToastManager";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"

const SEO = ({ user }) => {
  const email = user.email
  const thumbnailRef = useRef();
  const seoData = user?.SEO || {}; // fallback to empty object
  const [title, setTitle] = useState(seoData.title || "");
  const [description, setDescription] = useState(seoData.description || "");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState(seoData.keywords || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(seoData.thumbnailUrl || "");
  const [loader, setLoader] = useState(false)
  const [firstRun, setFirstRun] = useState(true)

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false)
      return;
    }
    const SEO = {
      title: title,
      description: description,
      keywords: keywords,
      thumbnailUrl: thumbnailUrl
    }
    debouncedSave(SEO)

  }, [title, description, keywords, thumbnailUrl])

  const saveData = async (data) => {
    const  NewDataSending = {
      email: email,
      SEO : data
    }
    try {
      const res = await fetch('/api/DashboardDataChange/seoData',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(NewDataSending)
      })
      if(!res.ok){
        showError("Database connection failed, make sure network connection is proper.")
      }
      else{
        reloadPreview()
      }
    } catch (error) {
      showError("Error while saving the data please try again later.")
    }
  }

  const debouncedSave = useCallback(
    debounce(saveData, 1000),
    [] // The empty dependency array ensures this function is only created once
  );

  const handleKeywords = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      e.preventDefault();
      if (!keywords.includes(keyword.trim())) {
        setKeywords([...keywords, keyword.trim()]);
        setKeyword("");

      } else {
        showInfo("Keyword already exists");
      }
    }
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));

  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showError("File type not supported or file didn't upload properly.");
      return;
    }

    setLoader(true);           // Start loading immediately
    setThumbnailUrl("");       // Remove old preview until upload finishes

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setThumbnailUrl(data.secure_url);
        showSuccess("Image added successfully.");
      } else {
        showError("Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      showError("Something went wrong with image upload.");
    } finally {
      setLoader(false);  // Stop loader regardless of success/failure
    }
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
    <div className="w-[90%] mx-auto py-6 mt-2 text-zinc-800 dark:text-zinc-100">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-orange-600">SEO Overview</h1>
      <p className="leading-relaxed text-sm mt-1 text-zinc-500">
        Search Engine Optimization (SEO) refers to improving your website’s
        visibility in search engines like Google. While these details may not
        directly influence your page design, they are essential for making your
        content discoverable. By providing accurate titles, descriptions, and
        keywords, you can improve your search rankings and help people find you
        online.
      </p>

      {/* Form */}
      <div className="mt-6 space-y-5 bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-md">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-medium">
            Page Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add the title for your page"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Page Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add an SEO-friendly description"
            className="mt-1"
          />
        </div>

        {/* Keywords */}
        <div>
          <Label htmlFor="keywords" className="text-sm font-medium">
            Keywords
          </Label>
          <Input
            id="keywords"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeywords}
            placeholder='Type a keyword and press "Enter"'
            className="mt-1"
          />
          {/* Keywords List */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {keywords.map((kw, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-3 py-1 rounded-full text-sm"
                >
                  {kw}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div className="flex items-center gap-4 mt-2">
          <input
            hidden
            type="file"
            ref={thumbnailRef}
            accept="image/*"
            onChange={handleThumbnailUpload}
          />

          <Button
            disabled={loader}
            type="button"
            variant="outline"
            onClick={() => thumbnailRef.current.click()}
            className="flex items-center gap-2 dark:disabled:bg-zinc-900 disabled:bg-zinc-200 disabled:cursor-not-allowed"
          >
            {loader ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus size={18} />}
            {loader ? "Uploading..." : "Add Thumbnail"}
          </Button>

          {loader && (
            <div className="w-[80px] h-[80px] flex items-center justify-center bg-zinc-600/40 rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          )}

          {!loader && thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt="Thumbnail preview"
              width={80}
              height={80}
              className="rounded-lg border object-cover"
              unoptimized
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default SEO;
