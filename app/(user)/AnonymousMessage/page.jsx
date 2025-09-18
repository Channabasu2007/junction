"use client";
import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { showError, showSuccess, showInfo } from "@/helpers/ToastManager";
import { se } from "date-fns/locale/se";
import { set } from "mongoose";
import UserPageFooter from "@/components/Footer/UserPageFooter";
import Link from "next/link";
import { Dot, Loader2 } from "lucide-react";

const page = () => {
    const params = useSearchParams();
    const userName = params.get("to");

    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [longMessage, setLongMessage] = useState(false);
    const [msgErrorText, setMsgErrorText] = useState("");
    const [email, setEmail] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [wrongMsgWarning, setWrongMsgWarning] = useState(false);
    const [aiMsgReview, setAiMsgReview] = useState(null);
    const [successfullySent, setSuccessfullySent] = useState(false);

    useEffect(() => {
        if (userName) getUserData();
    }, [userName]);

    useEffect(() => {
        if (!user) { return }
        if (
            !user?.FeedbacksCredentials ||
            user?.FeedbacksCredentials === undefined
        ) {
            return;
        }
        const msgWords = message.split(" ");
        if (!loading && user?.FeedbacksCredentials?.longMessages) {
            return;
        }
        if (
            !loading &&
            !user?.FeedbacksCredentials?.longMessages &&
            msgWords.length > 100
        ) {
            setLongMessage(true);
            setMsgErrorText("Message is too long. Please limit to 100 words.");
        }
    }, [message]);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const getUserData = async () => {
        try {
            const res = await fetch(
                `/api/fetchDataForDashboard?userName=${userName}`
            );
            const data = await res.json();
            setUser(data.user);
            if (!data.user) {
                setError(true)
                return
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

const handleCheck = async () => {
    if (!user) return;

    if (!user?.FeedbacksCredentials) {
        showInfo("User has not given permission to receive messages.");
        return;
    }

    if (!user?.FeedbacksCredentials?.enhancedFeedbacks) {
        // skip AI check → send directly
        handleSend();
        return;
    }

    if (!message || message.trim() === "") {
        setLongMessage(true);
        setMsgErrorText("Message cannot be empty");
        return;
    }

    if (
        !loading &&
        user?.FeedbacksCredentials?.recieveEmails &&
        !validateEmail(email)
    ) {
        setInvalidEmail(true);
        return;
    }

    setSending(true);
    try {
        const res = await fetch("/api/anonymousMessageCheck", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        setSending(false);


        if (!res.ok) {
            showError(data.error || "AI Response was not appropriate.");
            return;
        }

        if (data.proceed === "yes") {
            setAiMsgReview(data);    // keep UI in sync
            handleSend(data);        // pass directly
            return;
        }

        if (data.proceed === "no") {
            setAiMsgReview(data);
            setWrongMsgWarning(true);
            return;
        }
    } catch (error) {
        setSending(false);
        showError("Something went wrong, try again later.");
    }
};


const handleSend = async (aiData = null) => {
    if (!user) return;

    setSending(true);

    // Prefer aiData if passed, fallback to aiMsgReview
    const category = aiData?.category || aiMsgReview?.category || "other";


    try {
        const res = await fetch("/api/anonymousMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName,
                message,
                category,
            }),
        });

        if (!res.ok) {
            showError("Failed to send message. Please try again later.");
            setSending(false);
            return;
        }

        const data = await res.json();
        if (!data) {
            setError(true);
            return;
        }

        setSending(false);
        setSuccessfullySent(true);
    } catch (err) {
        setSending(false);
        showError("Network error. Try again later.");
    }
};


    if (error) {
        return (
            <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-orange-800">
                <div className="bg-white p-6 w-full flex items-center justify-center m-auto max-w-md rounded-2xl shadow-lg mx-4">
                    <h1 className="text-2xl text-orange-500  md:text-3xl font-bold text-center mb-6">
                        Failed to get connection please try later..
                    </h1>
                </div>
            </div>
        );
    }

    if (wrongMsgWarning && aiMsgReview !== null && message !== "") {
        return (
            <>
                <div className="w-[100dvw] h-[100dvh] overflow-x-hidden flex flex-col items-center justify-center bg-gradient-to-b from-red-500 to-red-800">
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center mx-4">
                        {/* Big Warning Icon */}
                        <div className="flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-20 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            Message Blocked
                        </h1>

                        {/* Details */}
                        <p className="text-gray-700 mb-2">
                            Your message was flagged as{" "}
                            <span className="font-semibold text-red-600">
                                {aiMsgReview?.msgType || "inappropriate"}
                            </span>
                            .
                        </p>
                        <p className="text-gray-600 text-sm mb-6">
                            <span className="font-semibold text-red-600/50"> Reason : </span>
                            {aiMsgReview?.note || "It violates our content guidelines."}
                        </p>

                        {/* Action Button */}
                        <button
                            onClick={() => {setWrongMsgWarning(false); setAiMsgReview(null);setMessage("")}}
                            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                        >
                            Go Back & Edit
                        </button>
                    </div>
                </div>
            </>
        );
    }

    if (successfullySent) {
        return (
            <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-green-800">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center mx-4">
                    {/* Big Success Icon */}
                    <div className="flex items-center justify-center mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-20 w-20 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-green-600 mb-4">
                        Message Sent!
                    </h1>

                    {/* Details */}
                    <p className="text-gray-700 mb-6">
                        Your message has been delivered successfully 🎉
                    </p>

                    {/* Action Button */}
                    <Link
                        href={`/${userName}`}
                        onClick={() => setSuccessfullySent(false)}
                        className="w-full px-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                        Back to {userName}'s Page
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>

            <div className="w-[100dvw] h-[100dvh]  flex items-center justify-center bg-gradient-to-b from-orange-500 to-orange-800">

                <div className="bg-white p-6 w-full m-auto max-w-md rounded-2xl shadow-lg mx-4">
                    <h1 className="text-2xl text-black  md:text-3xl font-bold text-center mb-6">
                        Send Message to{" "}
                        <span className="text-orange-500 font-extrabold text-4xl">
                            {userName}
                        </span>
                    </h1>

                    <div className="mt-4">
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 resize-none"
                            rows={4}
                            placeholder="Type your message..."
                            disabled={loading || sending}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleCheck();
                                }
                            }}
                        />
                        {longMessage && (
                            <p className="text-red-500 text-sm mt-2">
                                {msgErrorText || "Invalid Message"}
                            </p>
                        )}
                        {!loading && user?.FeedbacksCredentials?.recieveEmails && (
                            <>
                                <input
                                    type="email"
                                    placeholder="Your email (user wants to get the email we are not gone use your email for our campaingns)"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
                                />
                                {invalidEmail && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Invalid email address
                                    </p>
                                )}
                            </>
                        )}
                        <button
                            onClick={handleCheck}
                            disabled={sending}
                            className="mt-4 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? (
                                <span className="flex justify-center items-center gap-2">
                                    <Loader2 size={24} className="animate-spin font-bold" />
                                    Sending...
                                </span>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
