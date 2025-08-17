import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/Components/ui/input';
import { Lock, UploadCloud, ImagePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import Loader from '../Workers/Loader'
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"

const GeneralInfo = ({ user }) => {
  const profileRef = useRef();
  const bannerRef = useRef();
  const router = useRouter();

  const [ChangedUserName, setChangedUserName] = useState(user.userName?.toLowerCase() || "");
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [lastname, setLastname] = useState(user.lastname || "");
  const [email, setEmail] = useState(user.email || "");
  const [businessEmail, setBusinessEmail] = useState(user.businessEmail || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [bio, setBio] = useState(user.bio || "");
  const [bannerUrl, setBannerUrl] = useState(user.bannerUrl || "");
  const [profileUrl, setProfileUrl] = useState(user.profileUrl || "");
  const isFirstRun = useRef(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 10)
  }, [])

  const saveData = async (data) => {
    
     // always latest values
    const res = await fetch('/api/DashboardDataChange/GeneralInfo', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) showError("Failed to save changes.");
    reloadPreview()
  };


  // Memoize the debounced function using useCallback
  const debouncedSave = useCallback(
    debounce(saveData, 1000),
    [] // The empty dependency array ensures this function is only created once
  );
  const [firstRun, setFirstRun] = useState(true)
  useEffect(() => {
    if (firstRun) {
      setFirstRun(false)
      return
    }
    debouncedSave({ firstname, lastname, email, businessEmail, phone, bio });
  }, [firstname, lastname, email, businessEmail, phone, bio, pageLoading]);


  const updateProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // ✅ REQUIRED
    setPageLoading(true)
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();


      if (data.url) {
        setProfileUrl(data.url);
        showSuccess("Image added succesfully..")
        saveImages(data.url, "profile");
      } else {
        showError("Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      showError("Something went wrong with image upload.");
    } finally {
      setPageLoading(false)
    }
  };

  const updateBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    setPageLoading(true)
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setBannerUrl(data.url);
        saveImages(data.url, "banner");
        showSuccess("Image added succesfully..")
      } else {
        showError("Failed to upload banner.");
      }
    } catch (err) {
      console.error(err);
      showError("Something went wrong with banner upload.");
    } finally {
      setPageLoading(false)
    }
  };

  const saveImages = async (url, type) => {
    setPageLoading(true);
    try {
      // The API endpoint should not contain invalid characters like parentheses
      const res = await fetch(`/api/DashboardDataChange/image-upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          url,
          email
        })
      });

      if (!res.ok) {
        showError("Something went wrong while saving image URL.");
      } else {
        showSuccess("Image URL saved successfully!");
      }
    } catch (err) {
      console.error(err);
      showError("An unexpected error occurred.");
    } finally {
      setPageLoading(false);
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


  const renderInput = ({ label, id, value, setValue, disabled, tooltip }) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          disabled={disabled}
          className={`pr-10 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        />
        {disabled && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="absolute inset-y-0 right-3 flex items-center cursor-help text-zinc-500 dark:text-zinc-400">
                <Lock size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip || "This feature is only available for premium users."}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
  if (pageLoading) {
    return <Loader />
  }
  return (
    <div className="w-[90%] mx-auto py-6 mt-2 space-y-6 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">General Information</h1>

      {/* Hidden File Inputs */}
      <Input hidden id="profilePhoto" type="file" ref={profileRef} onChange={updateProfile} />
      <Input hidden id="banner" type="file" ref={bannerRef} onChange={updateBanner} />

      {/* Upload Buttons */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => profileRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
          >
            <ImagePlus size={18} /> Upload Profile / Logo
          </button>

          <button
            onClick={() => bannerRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
          >
            <UploadCloud size={18} /> Upload Banner
          </button>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Profile photo will show on your page. Banner image is used as background.
        </p>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput({
          label: "Page Pathname",
          id: "userName",
          value: ` /${ChangedUserName}`,
          setValue: (val) => setChangedUserName(val.split(" ").join("").toLowerCase()),
          disabled: user.userName,
          tooltip: "Pathname cannot be customized."
        })}

        {renderInput({
          label: "First Name",
          id: "firstname",
          value: firstname,
          setValue: setFirstname,
        })}

        {renderInput({
          label: "Email",
          id: "email",
          value: email,
          setValue: setEmail,
          disabled: true,
          tooltip: "You cannot change your email address."
        })}

        {renderInput({
          label: "Last Name",
          id: "lastname",
          value: lastname,
          setValue: setLastname,
        })}



        {renderInput({
          label: "Business Email",
          id: "businessEmail",
          value: businessEmail,
          setValue: setBusinessEmail,
          disabled: !user.isPremium,
          tooltip: "Only premium users can add a business email."
        })}

        {renderInput({
          label: "Phone Number",
          id: "phone",
          value: phone,
          setValue: setPhone,
          disabled: !user.isPremium,
          tooltip: "Only premium users can update phone numbers."
        })}

        <div className="md:col-span-2 space-y-1 mb-20 lg:mb-5">
          <label htmlFor="bio" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
          <textarea
            id="bio"
            placeholder="Write a short bio about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-600 transition"
          />
        </div>

      </div>
    </div>
  );
};

export default GeneralInfo;
