"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Navbar from "@/Components/Navbar/mainNavContainer";
import AnalyticsHeader from "@/Components/Analytics/AnalyticsHeader";
import AnalyticsSummary from "@/Components/Analytics/AnalyticsSummary";
import PageViewChart from "@/Components/Analytics/PageViewChart";
import WeeklyVisitorsStats from "@/Components/Analytics/WeeklyVisitorsStats";
import VisitorDiversionPercentage from "@/Components/Analytics/VisitorDiversionPercentage";
import LinksClickedStats from "@/Components/Analytics/LinksClickedStats";
import MessagesStats from "@/Components/Analytics/MessagesStats";
import Loader from "@/Components/Workers/Loader";
import { showError } from "@/helpers/ToastManager";
import Footer from "@/Components/Footer/Footer";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errorPage, setErrorPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong reload page to try again."
  );

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }

    setTimeout(() => setPageLoading(false), 200);
    getUserData(session?.user?.email);
  }, [status, session]);

  const getUserData = async (email) => {
    try {
      setPageLoading(true);
      const res = await fetch(`/api/fetchDataForDashboard?email=${session.user.email}`);
      if (!res.ok) {
        setErrorPage(true);
        setErrorMessage(
          "Server side data error, reload page and also check your internet speed."
        );
      }
      const data = await res.json();
      setErrorPage(false);
      setUser(data.user);
      setTimeout(() => setPageLoading(false), 200);
    } catch (error) {
      setErrorPage(true);
      setErrorMessage("Failed to fetch user data.");
      setPageLoading(false);
    }
  };

  if (pageLoading) return <Loader />;

  if (errorPage) {
    return (
      <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-orange-800 px-3 md:px-0">
        <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow-lg flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
            {errorMessage}
          </h1>
          <a
            href="/Analytics"
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
          >
            Reload
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
        {/* Header */}
        <AnalyticsHeader user={user} />

        {/* Summary section */}
        <AnalyticsSummary user={user} />

        {/* Charts + Stats grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visitors graph (2/3 width) */}
          <div className="lg:col-span-2">
            <PageViewChart user={user} pageLoading={pageLoading}/>
          </div>

          {/* Weekly stats + diversion stacked */}
          <div className="flex flex-col gap-6">
            <WeeklyVisitorsStats user={user} />
            <VisitorDiversionPercentage user={user} />
          </div>
        </div>

        {/* Links + Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LinksClickedStats user={user} />
          <MessagesStats user={user} />
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Page;
