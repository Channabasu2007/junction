"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/Components/Workers/Loader";
import Image from "next/image";

// Importing all the components for the designing 
import LinkdinStyle from "@/Components/DashboardMiddle/PageLayoutComponents/DesignsForSections/GeneralInfoDesigns/LinkdinStyle";
import SimpleStyle from '@/Components/DashboardMiddle/PageLayoutComponents/DesignsForSections/SocialMediaDesigns/SimpleStyle'
import PointsRoadmap from '@/Components/DashboardMiddle/PageLayoutComponents/DesignsForSections/EducationalInfoDesigns/PointsRoadmap'


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
          setTimeout(() => setTries((prev) => prev + 1), 1000);
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
        setTimeout(() => setTries((prev) => prev + 1), 1000);
      } else {
        setConnectionFailed(true);
        setError(
          "Failed to get the page data. Check your internet connection."
        );
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
          {error ||
            "We're sorry, we couldn't connect to the server. Please try again."}
        </p>
      </div>
    );
  }

  if (pageLoading) {
    return <Loader />;
  }

  // bacground image filters 
  const bgImage = user?.PageLayout?.bgImage || {};
  const opacity = (bgImage.opacity ?? 50) / 100; // percentage → decimal
  const brightness = (bgImage.brightness ?? 100) / 100;
  const contrast = (bgImage.contrast ?? 100) / 100;
  const blur = bgImage.blur ?? 0;
  const saturation = (bgImage.saturation ?? 100) / 100;
  const grayscale = (bgImage.grayscale ?? 0) / 100;
  const sepia = (bgImage.sepia ?? 0) / 100;
  const hue = bgImage.hue ?? 0;
  const overlayColor = bgImage.overlayColor ?? "#000000";
  const bgUrl = bgImage.url ?? "https://images.pexels.com/photos/1031669/pexels-photo-1031669.jpeg"


  const componentMap = {
    LinkdinStyle: LinkdinStyle,
  };

  // ... inside the ProfilePage component
  const GeneralInfoSectionName = user?.PageLayout?.GeneralInfoSection ?? "LinkdinStyle";
  const GeneralInfoSectionComponent = componentMap[GeneralInfoSectionName];

  return (
<div className="relative h-[100dvh] w-full overflow-y-auto">
  {/* Background + Overlay Layer */}
  <div
    className="absolute inset-0 w-full h-[100%] bg-cover bg-center"
    style={{
      backgroundImage: `url(${bgUrl})`,
      filter: `
        brightness(${brightness})
        contrast(${contrast})
        blur(${blur}px)
        saturate(${saturation})
        grayscale(${grayscale})
        sepia(${sepia})
        hue-rotate(${hue}deg)
      `,
      zIndex: 0, // ensure background stays at bottom
    }}
  >
    {/* Overlay */}
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: overlayColor,
        opacity,
      }}
    />
  </div>

  {/* Page Content Layer */}
  <div className="absolute h-[100dvh] w-full overflow-y-auto z-10 ">
    <GeneralInfoSectionComponent user={user} />
    <SimpleStyle user={user} />
    <PointsRoadmap user={user} />
  </div>
</div>

  );
};

export default ProfilePage;