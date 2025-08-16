"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/Components/Workers/Loader";

const ProfilePage = () => {
  const router = useRouter();
  const { profile } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [tries, setTries] = useState(0);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, [profile, tries]);

  const getData = async () => {
    try {
      const res = await fetch(`/api/fetchDataForDashboard?userName=${profile}`);
      if (!res.ok) {
        if (tries < 3) {
          setTimeout(() => setTries(prev => prev + 1), 1000); // retry after 1s
        } else {
          router.push("/NotFound");
        }
        return;
      }

      const data = await res.json();
      console.log(data)
      setUser(data.user);
      setConnectionFailed(false);
    } catch (err) {
      if (tries < 3) {
        setTimeout(() => setTries(prev => prev + 1), 1000);
      } else {
        setConnectionFailed(true);
        setError("Failed to get the page data. Check your internet connection.");
      }
    } finally {
      setPageLoading(false);
    }
  };

  if (connectionFailed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-100 text-gray-800">
        <h2 className="text-xl mb-2 text-red-600">Connection Failed</h2>
        <p className="text-gray-600 max-w-md">
          {error || "We're sorry, we couldn't connect to the server. Please try again."}
        </p>
      </div>
    );
  }

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      hello {user?.email || "Guest"}
    </div>
  );
};

export default ProfilePage;
