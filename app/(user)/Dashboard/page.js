"use client";
import React from "react";
import Navbar from "@/Components/Navbar/mainNavContainer";
import { Settings, BarChart2, Smartphone, icons } from "lucide-react";
import {
  ChartNoAxesColumnIncreasing,
  User,
  Globe,
  Video,
  CreditCard,
  MessageCircle,
  LayoutGrid,
  Image,
  Search,
  Lock,
  Contact,
} from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/Components/ui/drawer";
import { useSwipeable } from "react-swipeable";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { useSession } from "next-auth/react";
import Loader from "@/Components/Workers/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Main from "@/Components/DashboardMiddle/Main";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageLoading, setPageLoading] = useState(true); // default true
  const [component, setComponent] = useState("General Info");
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => setPreviewOpen(false),
    delta: 50, // minimum distance
    trackTouch: true,
  });

  useEffect(() => {
    if (status === "loading")
      return; // wait until session is resolved
    else if (status === "unauthenticated") {
      router.push("/login");
    }
    setPageLoading(false);
  }, [status, session]);

  const drawerItems = [
    { icon: <User size={18} />, label: "General Info" },
    {icon : <Contact size={18}/>, label: "Personal Info"},
    { icon: <Globe size={18} />, label: "Social Media" },
    { icon: <Video size={18} />, label: "Video Embedding" },
    { icon: <CreditCard size={18} />, label: "Payment Details" },
    { icon: <MessageCircle size={18} />, label: "Feedbacks" },
    { icon: <LayoutGrid size={18} />, label: "Page Layout" },
    { icon: <Image size={18} />, label: "Thumbnail" },
    { icon: <Search size={18} />, label: "SEO" },
  ];

  const HandleCompoChange = (item) => {
    setOpen(false);
    setComponent(item);
  };
  const handleAccountChange = () => {
    setOpen(false);
    setComponent("Account");
  };

  if (pageLoading || status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      {/* Desktop Layout */}
      <div className="lg:flex hidden">
        <div className="flex flex-col justify-between border-r w-[20vw] h-[89vh] bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 shadow-md">
          {/* Navigation Items */}
          <div className="flex flex-col gap-2 mt-4 px-4">
            {drawerItems.map((item, index) => (
              <div
                onClick={() => setComponent(item.label)}
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 cursor-pointer transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Account & Analytics Button at Bottom */}
          <div className="px-4 py-4 border-t dark:border-zinc-700">
            <button
              onClick={() => router.push("/Analytics")}
              className="w-full mb-4 flex items-center gap-3 px-4 py-2 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800 font-medium transition-colors"
            >
              <BarChart2 className="w-5 h-5" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setComponent("Account")}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
            >
              <span>
                <User />
              </span>
              <span>Account</span>
            </button>
          </div>
        </div>

        {/* Middle where the content is located  */}
        <div className="border  w-[50vw] h-[89vh] overflow-y-auto ">
          <Main component={component} />
        </div>

        {/* Right side where preview is located */}
        <div className="border  w-[30vw] flex items-center justify-center h-[89vh]">
          <div className=" flex justify-center">
            <div className="w-[275px] h-[550px] rounded-[2rem] shadow-xl border-6 dark:border-zinc-400 border-zinc-950 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
              {/* Status bar */}
              <div className="w-full h-5 bg-zinc-800 text-white flex justify-between px-4 items-center text-xs font-mono">
                <span>9:11</span>
                <span className="tracking-widest">📶 🔋</span>
              </div>

              {/* Content area */}
              <div className="h-full overflow-y-auto p-4 space-y-4">
                {/* Replace this with your actual mobile preview content */}
                <div className="bg-white dark:bg-zinc-700 p-4 rounded-xl shadow">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Preview Title
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    This is sample content.
                  </p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-xl shadow">
                  <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-100">
                    Another Section
                  </h2>
                  <p className="text-sm text-orange-700 dark:text-orange-200">
                    More mobile UI stuff here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="lg:hidden">
        <div className="border w-[100vw] h-[89vh] overflow-y-auto ">
          <Main component={component} />
        </div>

        <div className="lg:hidden fixed bottom-5 w-full z-50">
          <div className="rounded-2xl items-center justify-center flex w-fit mx-auto bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg border border-gray-300">
            {/* Analytics */}
            <button
              className="w-[60px] py-4 rounded-l-2xl flex justify-center hover:bg-orange-100 dark:hover:bg-orange-900 transition"
              onClick={() => router.push("/Analytics")}
            >
              <BarChart2 size={24} />
            </button>

            {/* Settings Drawer */}
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <button
                  className="w-[60px] py-4 flex justify-center hover:bg-orange-100 dark:hover:bg-orange-900 transition rounded-md"
                  onClick={() => setOpen(true)}
                >
                  <Settings size={24} />
                </button>
              </DrawerTrigger>

              <DrawerContent className="rounded-t-2xl border-t bg-white dark:bg-black text-gray-700 dark:text-gray-300 shadow-xl">
                <DrawerHeader>
                  <DrawerTitle className="text-xl font-semibold">
                    Settings
                  </DrawerTitle>
                  <DrawerDescription className="text-sm">
                    Customize your preferences
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-3">
                  {drawerItems.map((item, index) => (
                    <button
                      onClick={() => HandleCompoChange(item.label)}
                      key={index}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900 transition text-left"
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={handleAccountChange}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900 transition text-left"
                  >
                    <Lock /> Account
                  </button>
                </div>
              </DrawerContent>
            </Drawer>

            {/* Mobile Preview Sheet */}
            <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
              <SheetTrigger asChild>
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="w-[60px] py-4 rounded-r-2xl flex justify-center hover:bg-orange-100 dark:hover:bg-orange-900 transition"
                >
                  <Smartphone size={24} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                {...handlers}
                className="w-[95vw] max-w-none p-6 bg-white dark:bg-zinc-950"
              >
                <SheetHeader>
                  <SheetTitle>
                    <span className="text-3xl font-extrabold tracking-tight text-orange-600">
                      JUNCTION
                    </span>
                  </SheetTitle>
                  <SheetDescription className="text-zinc-500 dark:text-zinc-400">
                    This is how your page will look on mobile.
                  </SheetDescription>
                </SheetHeader>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2 h-16 bg-gray-300 dark:bg-gray-600 rounded-full shadow-lg"></div>
                </div>
                {/* Swipeable area starts here */}
                <div className="mt-1 flex justify-center">
                  <div className="w-[320px] h-[640px] rounded-[2rem] shadow-xl border-8 border-zinc-950 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                    {/* Status bar */}
                    <div className="w-full h-5 bg-zinc-800  text-white flex justify-between px-4 items-center text-xs font-mono">
                      <span className="mt-1">9:11</span>
                      <span className="tracking-widest mt-1">📶 🔋</span>
                    </div>

                    {/* Content area */}
                    <div className="h-full overflow-y-auto p-4 space-y-4">
                      <div className="bg-white dark:bg-zinc-700 p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          Preview Title
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                          This is sample content.
                        </p>
                      </div>
                      <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-100">
                          Another Section
                        </h2>
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          More mobile UI stuff here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Swipeable area ends */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
