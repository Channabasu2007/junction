"use client"
import React, { useEffect, useState } from 'react';
import GeneralInfo from './GeneralInfo';
import SocialMedia from './SocialMedia';
import Account from './Account';
import Feedbacks from './Feedbacks';
import PageLayout from './PageLayout';
import PaymentDetails from './PaymentDetails';
import SEO from './SEO';
import Thumbnail from './Thumbnail';
import VideoEmbedding from './VideoEmbedding';
import Loader from '@/Components/Workers/Loader';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import SetPageNameCompo from '../UsersSettings/SetPageName'
const Main = ({ component }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [pageLoading, setPageLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [redirecting, setRedirecting] = useState(false);

    const componentMap = {
        GeneralInfo,
        SocialMedia,
        Account,
        Feedbacks,
        PageLayout,
        PaymentDetails,
        SEO,
        Thumbnail,
        VideoEmbedding,
    };

    const formattedComponent = component.split(" ").join("");
    const ComponentToRender = componentMap[formattedComponent];

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (status === "authenticated") {
            fetchData();
        }
    }, [status]);

    const fetchData = async () => {
        setPageLoading(true);
        try {
            const res = await fetch(`/api/fetchDataForDashboard?email=${session.user.email}`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            setUserData(data.user);
        } catch (error) {
            showError("Error fetching user data");
        } finally {
            setPageLoading(false);
        }
    };

    // 🔁 Watch userData once it’s loaded
    useEffect(() => {
        if (!userData) return;

        if (!userData.userName || userData.userName.trim() === "") {
            setRedirecting(true);
        }
    }, [userData, router]);
  const handleSuccess = () => {
         setRedirecting(false);
        router.refresh(); // This will refresh the dashboard page
    };

    // ⛔ Show loader if loading or redirecting
    if (pageLoading || status === "loading" || !ComponentToRender) {
        return <Loader />;
    }
    if (redirecting) {
        return <SetPageNameCompo user={userData} onSuccess={handleSuccess} />
    }

    return (
        <>
            <ComponentToRender user={userData} />
        </>
    );
};

export default Main;
