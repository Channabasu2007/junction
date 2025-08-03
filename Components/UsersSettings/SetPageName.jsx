'use client';
import React, { useRef, useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { showError, showSuccess, showInfo } from "@/helpers/ToastManager";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SetPageNameCompo = ({ user }) => {
    const router = useRouter()

    const userData = user?.user || {};
    const [inputValue, setInputValue] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [message, setMessage] = useState('');

    const firstName = userData?.firstname || '';
    const lastName = userData?.lastname || '';
    const name = `${firstName} ${lastName}`.trim();

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const checkAndSubmitName = async (value) => {
        setIsChecking(true);
        try {
            const res = await fetch('/api/UserDataStore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: value,
                    email: userData.email,
                }),
            });

            const result = await res.json();

            if (res.ok && result.success) {

                setMessage("✅ Page name set successfully.");
            } else if (result.exists) {
                showError("This page name is already taken.");
                setMessage("❌ Page name already exists.");
            } else if (result.error) {
                showError(result.error);
                setMessage("⚠️ " + result.error);
            } else {
                showError("Unknown server response.");
            }
        } catch (err) {
            showError("Error while connecting to server.");
        } finally {
            setIsChecking(false);
        }
    };

    const debouncedSubmit = useRef(debounce(checkAndSubmitName, 500)).current;

    const handleChange = (e) => {
        const value = e.target.value.trim();
        setInputValue(value);
        setMessage('');
        if (value) {
            debouncedSubmit(value);
        }
    };

    const GoToDashboard = () => {
        router.push("/Dashboard")
    }

    return (
        <div className="flex items-center justify-center h-[89vh] p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="p-6 sm:p-8 rounded-xl shadow-2xl transition-colors duration-300 w-full max-w-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white">

                {/* The theme toggle is handled by your external provider, so it's not needed here */}

                {/* Header */}
                <h1 className="text-2xl font-bold text-center sm:text-3xl text-orange-500">
                    Welcome, {name} 👋
                </h1>
                <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Choose a unique name for your public URL.
                </p>

                {/* Input and Button */}
                <div className="mt-6 flex flex-col gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Enter your page name"
                            className="w-full py-2 px-3 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300
                         bg-zinc-50 dark:bg-zinc-700 text-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-600 placeholder-zinc-400 dark:placeholder-zinc-500"
                        />
                    </div>

                    <button
                        onClick={GoToDashboard}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm  py-2.5 rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
                        disabled={isChecking || inputValue.length === 0}
                    >
                        {isChecking ? 'Checking...' : 'Proceed'}
                    </button>
                </div>

                {/* Message and URL Preview */}
                {message && inputValue !== "" && (
                    <p className={`mt-3 text-sm text-center ${message.includes("Page name set successfully.") ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                <div className="mt-4 p-3 rounded-lg text-xs text-center bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                    <p>
                        Your public URL will be:
                        <br />
                        <span className="font-semibold text-sm">
                            {process.env.NEXT_PUBLIC_URL || 'https://example.com/'}
                            <span className="text-orange-500">{inputValue || 'your-page'}</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SetPageNameCompo;
