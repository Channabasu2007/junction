import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // if you’re using shadcn utils
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LinkdinStyle = ({ user }) => {
  const [msgPrefPopup, setMsgPrefPopup] = useState(false);

  const firstName = user?.firstname ?? "Example";
  const lastName = user?.lastname ?? "User";
  const bio =
    user?.bio ??
    "JUNCTION is online presence enhancer website, which can contribute to improve the connections online you can use it as a portfolio or a social media plaftforms link holder page. The most exiting feature is this is done for free.";
  const email = user?.email ?? "junction@examplepage.com";
  const businessEmail = user?.businessEmail ?? "junction@business.com";
  const phone = user?.phone ?? "8762017679";
  const bannerUrl =
    user?.bannerUrl ??
    "http://res.cloudinary.com/dttkivero/image/upload/v1755159067/mkpv43bwbehyq5cfyt8p.jpg";
  const profileUrl =
    user?.profileUrl ??
    "https://img.freepik.com/premium-vector/stick-figure-man-doodle-drawing-isolated_566661-1697.jpg?semt=ais_hybrid&w=740&q=80";
  const nickname = user?.nickname ?? "Junctuu";
  const location = user?.location ?? "Bengaluru";
  const qualification = user?.qualification ?? "Web developer";
  const workStatus = user?.workStatus ?? "Student";
  const DOB = user?.DOB ?? "2007-12-11T18:30:00.000Z";
  const secondaryColor = user?.PageLayout?.ColorsPicker?.secondary ?? "#9333ea";
  const primaryColor = user?.PageLayout?.ColorsPicker?.primary ?? "#2563eb";
  const paragraphColor = user?.PageLayout?.ColorsPicker?.paragraph ?? "#374151";

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  const mail = user?.businessEmail ?? user?.email;
  const mailUrl = isMobile
    ? `mailto:${mail}` // 📱 On phone → open default mail app
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`; // 💻 On desktop → open Gmail in browser
  const personalEmail =  isMobile
    ? `mailto:${email}` // 📱 On phone → open default mail app
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  const phoneUrl = isMobile
    ? `tel:${phone}` // 📱 Mobile → open dialer
    : `https://wa.me/${phone}`; // 💻 Desktop → open WhatsApp Web

  const statusColors = {
    student: "bg-blue-600 text-white shadow-md shadow-blue-500/40",
    intern: "bg-teal-600 text-white shadow-md shadow-teal-500/40",
    "employed-full": "bg-green-600 text-white shadow-md shadow-green-500/40",
    "employed-part":
      "bg-emerald-600 text-white shadow-md shadow-emerald-500/40",
    "self-employed": "bg-purple-600 text-white shadow-md shadow-purple-500/40",
    freelancer: "bg-pink-600 text-white shadow-md shadow-pink-500/40",
    unemployed: "bg-red-600 text-white shadow-md shadow-red-500/40",
    "career-break": "bg-orange-600 text-white shadow-md shadow-orange-500/40",
    homemaker: "bg-fuchsia-600 text-white shadow-md shadow-fuchsia-500/40",
    retired: "bg-gray-600 text-white shadow-md shadow-gray-500/40",
    volunteer: "bg-indigo-600 text-white shadow-md shadow-indigo-500/40",
    other: "bg-slate-600 text-white shadow-md shadow-slate-500/40",
  };

  const labelMap = {
    student: "Student",
    intern: "Intern / Apprentice",
    "employed-full": "Full-Time",
    "employed-part": "Part-Time",
    "self-employed": "Self-Employed",
    freelancer: "Freelancer",
    unemployed: "Looking for Work",
    "career-break": "Career Break",
    homemaker: "Homemaker",
    retired: "Retired",
    volunteer: "Volunteer",
    other: "Other",
  };

  return (
    <div className="bg-transparent w-full z-10 ">
      <div className="w-full px-3 relative pt-3 ">
        <div
          className="w-full relative aspect-[851/315] max-h-[220px]   sm:max-h-[220px] md:max-h-[280px] lg:max-h-[320px] xl:max-h-[380px] rounded-xl"
          style={{
            boxShadow: `0 0 15px 4px ${secondaryColor}40`, // soft glow with opacity
          }}
        >
          <Image
            src={bannerUrl}
            alt={`${firstName}'s page banner.`}
            fill
            priority
            className="object-cover object-center rounded-lg"
          />
        </div>
        <div className="w-[120px] h-[120px] md:w-[175px] md:h-[175px] absolute ml-3 -bottom-22   ">
          <Image
            src={profileUrl}
            alt={`${firstName}'s profile photo/logo`}
            fill
            priority
            className="object-cover object-center rounded-full"
          />
        </div>
        <div className="absolute mt-2 md:mt-3 right-3 flex items-center gap-1">
          {workStatus && (
            <span
              className={cn(
                "px-3 py-1.5 rounded-full font-medium shadow-sm backdrop-blur-sm",
                "text-xs sm:text-sm md:text-base",
                statusColors[workStatus]
              )}
            >
              {labelMap[workStatus]}
            </span>
          )}

          {/* Location Badge */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: secondaryColor }}
                  className="inline-flex items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg
               w-9 h-9 sm:w-10 sm:h-10"
                >
                  <MapPin
                    className="shrink-0"
                    style={{
                      color: primaryColor,
                      width: "1.1rem",
                      height: "1.1rem",
                    }}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{location}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Phone Badge (icon only, balanced padding) */}
          <Link
            href={phoneUrl}
            target="_blank"
            style={{ backgroundColor: secondaryColor }}
            className="inline-flex items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg
               w-9 h-9 sm:w-10 sm:h-10"
          >
            <Phone
              style={{ color: primaryColor, width: "1.1rem", height: "1.1rem" }}
            />
          </Link>

          {/* Mail redirect  */}
          <Link
            href={mailUrl}
            target="_blank"
            style={{ backgroundColor: secondaryColor }}
            className="inline-flex items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg
               w-9 h-9 sm:w-10 sm:h-10"
          >
            <Mail
              style={{ color: primaryColor, width: "1.1rem", height: "1.1rem" }}
            />
          </Link>

          <div
            className="inline-flex items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg
               w-9 h-9 sm:w-10 sm:h-10"
            style={{ backgroundColor: secondaryColor }}
            onClick={() => setMsgPrefPopup(true)}
          >
            <MessageCircle
              style={{ color: primaryColor, width: "1.1rem", height: "1.1rem" }}
            />
          </div>
        </div>
      </div>
      {/* Popup */}
     <Dialog open={msgPrefPopup} onOpenChange={setMsgPrefPopup}>
  <DialogContent className="sm:max-w-md rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold text-center text-zinc-800 dark:text-zinc-100">
        Choose how to contact
      </DialogTitle>
    </DialogHeader>

    <div className="flex flex-col gap-4 mt-6">
      {/* Mail link */}
      <a
        href={`mailto:${personalEmail}`}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 dark:text-blue-400 font-medium transition hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        ✉️ Send Mail
      </a>

      {/* Anonymous message link */}
      <Link
        href="/msgs"
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-400 text-gray-700 dark:text-gray-300 font-medium transition hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        🕵️ Message Anonymously
      </Link>
    </div>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default LinkdinStyle;
