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
import Footer from "@/Components/Footer/Footer";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetchUserData(session.user.email);
    }
  }, [status, session]);

  const fetchUserData = async (email) => {
    try {
      setPageLoading(true);
      const res = await fetch(`/api/fetchDataForDashboard?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      const data = await res.json();
      setUser(data.user);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while loading your dashboard. Please reload."
      );
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) return <Loader />;

  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-orange-500 to-orange-800 px-3 md:px-0">
        <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
            {error}
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

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
        <AnalyticsHeader user={user} />
        <AnalyticsSummary user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PageViewChart user={user} pageLoading={pageLoading} />
          </div>
          <div className="flex flex-col gap-6">
            <WeeklyVisitorsStats user={user} />
            <VisitorDiversionPercentage user={user} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LinksClickedStats user={user} />
          <MessagesStats user={user} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
