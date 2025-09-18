"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import Loader from '@/components/Workers/Loader';
import Image from "next/image";

const DEVICES = {
  "iPhone SE": { width: 320, height: 568 },
  "iPhone 14 Pro": { width: 390, height: 844 },
  "iPad": { width: 768, height: 1024 },
  "Pixel 7": { width: 412, height: 915 },
};
export const reloadPreview = () => {
  const iframe = document.getElementById("mobilePreviewIframe");
  if (iframe) {
    iframe.src = iframe.src;
  }
};


const MobilePreview = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchData()
  }, [])
  const [device, setDevice] = useState("iPhone 14 Pro");

  useEffect(() => {
    const iframe = document.getElementById("mobilePreviewIframe");
    if (!iframe) return;

    iframe.onload = () => {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (doc) {
        let meta = doc.querySelector("meta[name=viewport]");
        if (!meta) {
          meta = doc.createElement("meta");
          meta.name = "viewport";
          doc.head.appendChild(meta);
        }
        // force Tailwind to render as if it's on this device width
        meta.content = `width=${DEVICES[device].width}, initial-scale=1`;
      }
    };
  }, [device]);


  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchDataForDashboard?email=${session.user.email}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      showError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return <Loader />;
  }

  return (

    <div className=" flex justify-center ">
      <div className="w-[265px] h-[550px] flex justify-center  items-center  relative">

       
          
          {/* Device selector */}

<div>
          {/* Device frame */}
          <div
          
            className=" bg-white scale-65 border-6 border-black dark:border-zinc-400 rounded-[2rem] shadow-xl overflow-hidden relative"
            style={{
              width: 390, height: 844,
              
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 30px 30px rgba(0,0,0,0.75)",
            }}
          >
            <iframe
              src={`${process.env.NEXT_PUBLIC_IP_URL}/${user.userName}?preview=true`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              id="mobilePreviewIframe"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div></div>
 

    
    </div>

  );
};

export default MobilePreview;