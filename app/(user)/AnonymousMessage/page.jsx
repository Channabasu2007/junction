"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { showError, showSuccess, showInfo } from "@/helpers/ToastManager";
import { se } from 'date-fns/locale/se';
import { set } from 'mongoose';

const page = () => {
    const params = useSearchParams()
    const userName = params.get('to')

    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [longMessage, setLongMessage] = useState(false)
    const [msgErrorText, setMsgErrorText] = useState("")
    const [email, setEmail] = useState("")
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (!userName) return;
        getUserData()
    }, [])

    useEffect(() => {
        const msgWords = message.split(" ")
        if (!loading && user.FeedbacksCredentials.longMessages) {
            return;
        }
        if (!loading && !user.FeedbacksCredentials.longMessages && msgWords.length > 100) {
            setLongMessage(true)
            setMsgErrorText("Message is too long. Please limit to 100 words.")
        }
    }, [message])

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const getUserData = async () => {
        try {
            const res = await fetch(`/api/fetchDataForDashboard?userName=${userName}`);
            const data = await res.json();
            setUser(data.user);
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async () => {
        if (!message || message.trim() === "") {
            setLongMessage(true);
            setMsgErrorText("Message cannot be empty");
            return;
        }
        if (!loading && user.FeedbacksCredentials.recieveEmails && !validateEmail(email)) {
            setInvalidEmail(true);
            return;
        }
        setSending(true)
        try {
            const res = await fetch('/api/anonymousMessageCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })
            if (!res.ok) {
                showError("Ai Response was not appropriate.")
            }
            const data = await res.json()
            setSending(false)
            console.log(data)
        } catch (error) {
            setSending(false)
            showError("Something went wrong try again later.")
        }

    }

    const handleSend = async () => {
        setSending(true)
        const res = await fetch('/api/anonymousMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, message })
        })
    }

    if (error) {
        return (
            <div className='w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-orange-800'>
                <div className="bg-white p-6 w-full flex items-center justify-center m-auto max-w-md rounded-2xl shadow-lg mx-4">
                    <h1 className="text-2xl text-orange-500  md:text-3xl font-bold text-center mb-6">Failed to get data please try later..</h1>
                </div>
                
            </div>
        )
    }

    return (
        <>
            <div className='w-[100dvw] h-[100dvh] flex items-center justify-center bg-gradient-to-b from-orange-500 to-orange-800'>
                <div className="bg-white p-6 w-full m-auto max-w-md rounded-2xl shadow-lg mx-4">
                    <h1 className="text-2xl text-black  md:text-3xl font-bold text-center mb-6">
                        Send Message to <span className='text-orange-500 font-extrabold text-4xl'>{userName}</span>
                    </h1>

                    <div className="mt-4">
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 resize-none"
                            rows={4}
                            placeholder="Type your anonymous message..."
                            disabled={loading || sending}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {longMessage && (
                            <p className="text-red-500 text-sm mt-2">
                                {msgErrorText || "Invalid Message"}
                            </p>
                        )}
                        {!loading && user.FeedbacksCredentials.recieveEmails && (<>
                            <input type="text" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800" />
                            {invalidEmail && (
                                <p className="text-red-500 text-sm mt-2">
                                    Invalid email address
                                </p>
                            )}
                        </>
                        )}
                        <button
                            onClick={handleCheck}
                            disabled={loading}
                            className="mt-4 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page