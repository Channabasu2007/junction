"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/Components/Workers/Loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Select } from "@/Components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/Components/Navbar/mainNavContainer";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import Footer from "@/Components/Footer/Footer";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";

const MessagesPage = () => {
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category") || "all";
  const { data: session, status } = useSession();
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong reload page to try again."
  );
  const [user, setUser] = useState(null);

  const [category, setCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState("newest");

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
      const res = await fetch(`/api/fetchDataForDashboard?email=${email}`);
      if (!res.ok) {
        setErrorPage(true);
        setErrorMessage("Server error, try reloading.");
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

  // Delete message
  const deleteMessage = async (msgId) => {
    try {
      const res = await fetch(`/api/deleteMessage`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, msgId }),
      });
      if (res.ok) {
        setUser((prev) => ({
          ...prev,
          messages: prev.messages.filter((m) => m._id !== msgId),
        }));
      } else {
        showError("Failed to delete message.");
      }
    } catch (err) {
      showError("Error deleting message.");
    }
  };

  const filteredMessages = useMemo(() => {
    if (!user?.messages) return [];
    let msgs = [...user.messages];
    if (category !== "all") {
      msgs = msgs.filter((m) => m.category === category);
    }
    msgs.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    return msgs;
  }, [user, category, sortBy]);

  const categories = [
    "all",
    "feedback",
    "happy",
    "question",
    "regarding",
    "story",
    "support",
    "complaint",
    "joke",
    "spam",
    "other",
    "suggestion",
    "appreciation",
    "criticism",
    "update",
    "announcement",
    "greetings",
  ];

  if (pageLoading) return <Loader />;

  if (errorPage) {
    return (
      <div className="w-[100dvw] h-[100dvh] flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h1 className="text-xl font-bold text-orange-500 mb-4">{errorMessage}</h1>
          <a
            href="/Messages"
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
          >
            Reload
          </a>
        </div>
      </div>
    );
  }

  return (<>
  <Navbar />
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Filters */}
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  category === cat
                    ? "bg-orange-500 text-white shadow"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
<ToggleGroup
  type="single"
  value={sortBy}
  onValueChange={(val) => val && setSortBy(val)}
  className="border rounded-md p-1"
>
  <ToggleGroupItem
    value="newest"
    className="px-3 py-1 text-sm rounded-md data-[state=on]:bg-orange-500 data-[state=on]:text-white"
  >
    Newest
  </ToggleGroupItem>
  <ToggleGroupItem
    value="oldest"
    className="px-3 py-1 text-sm rounded-md data-[state=on]:bg-orange-500 data-[state=on]:text-white"
  >
    Oldest
  </ToggleGroupItem>
</ToggleGroup>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="text-center text-neutral-500">No messages found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredMessages.map((msg) => (
            <Card key={msg._id} className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-orange-500 text-lg">
                  {msg.category}
                </CardTitle>
                <CardDescription>
                  {new Date(msg.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{msg.content}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMessage(msg._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
    <Footer/></>
  );
};

export default MessagesPage;
