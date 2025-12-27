"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loader from '@/Components/Workers/Loader';
import SetPageNameCompo from '../UsersSettings/SetPageName';
import { showError } from '@/helpers/ToastManager';

// Components map
import GeneralInfo from './GeneralInfo';
import SocialMedia from './SocialMedia';
import Account from './Account';
import Feedbacks from './Feedbacks';
import PageLayout from './PageLayout';
import SEO from './SEO';
import PersonalInfo from './PersonalInfo';
import VideoEmbedding from './VideoEmbedding';
import Education from './Education';

const componentMap = {
  GeneralInfo,
  SocialMedia,
  Account,
  Feedbacks,
  PageLayout,
  SEO,
  PersonalInfo,
  VideoEmbedding,
  Education
};

export default function Main({ component }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);   // ✅ One source of truth
  const [needsUserName, setNeedsUserName] = useState(false);

  const ComponentToRender = componentMap[component.replace(/\s/g, "")];

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    fetchData();
  }, [status]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchDataForDashboard?email=${session.user.email}`);
      const data = await res.json();

      setUserData(data.user);

      // ✅ Check username only after real data arrives
      if (!data.user?.userName?.trim()) {
        setNeedsUserName(true);
      } else {
        setNeedsUserName(false);
      }

    } catch (err) {
      showError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  }

  const handleSuccess = () => {
    fetchData(); // ✅ refresh from backend
  };

  // ⛔ Don't render anything until data loaded
  if (loading || status === "loading") {
    return <Loader />;
  }

  // ✅ Force username page only when needed
  if (needsUserName) {
    return <SetPageNameCompo user={userData} onSuccess={handleSuccess} />;
  }

  // ✅ Only render dashboard when username confirmed
  return <ComponentToRender user={userData} />;
}
