"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/Components/Navbar/mainNavContainer";
import Loader from "@/Components/Workers/Loader";
import { useRouter } from "next/navigation";
import SetPageNameCompo from "@/Components/UsersSettings/SetPageName";
import { showError } from "@/helpers/ToastManager";

const SetPageName = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null); // <- state to store user
  const email = session?.user?.email;

  useEffect(() => {
    if (status === "authenticated" && email) {
      fetchData();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, email]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/UserDataStore?email=${email}`)

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await res.json();
      setUser(userData);
    } catch (err) {
      showError("Something went wrong while loading user data");
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  if (status === "loading" || pageLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      {user && <SetPageNameCompo user={user} />}
    </div>
  );
};

export default SetPageName;
