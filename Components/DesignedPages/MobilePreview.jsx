import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import Loader from '@/Components/Workers/Loader';
import Image from "next/image";

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

       <div
      className="mx-auto "
      style={{
        width: "275px",       // mobile width
        height: "567px",      // mobile height
        border: "1px solid #ccc",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <iframe
        src={`${process.env.NEXT_PUBLIC_IP_URL}/${user.userName}`} 
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        id="mobilePreviewIframe"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>

    );
};

export default MobilePreview;

