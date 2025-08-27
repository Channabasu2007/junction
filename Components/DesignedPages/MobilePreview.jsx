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

        <iframe

            id="mobilePreviewIframe"
            className="h-[550px] w-[275px]"
            src={`${process.env.NEXT_PUBLIC_IP_URL}/${user.userName}`} 
            frameBorder="0">
            
        
        </iframe>
    );
};

export default MobilePreview;

