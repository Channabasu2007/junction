'use client';
import React, { useRef, useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { showError, showSuccess, showInfo } from "@/helpers/ToastManager";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


/**
 * A component to set a unique page name for the user's public URL.
 * It now accepts an `onSuccess` prop to handle post-submission actions.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user data object.
 * @param {Function} props.onSuccess - Callback function to execute on successful name submission.
 */
const SetPageNameCompo = ({ user, onSuccess }) => {
    const router = useRouter()

    const userData = user?.user || user;
    const [inputValue, setInputValue] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // New state to track success

    const firstName = userData?.firstname || '';
    const lastName = userData?.lastname || '';
    const name = `${firstName} ${lastName}`.trim();

    // Debounce function to delay API calls
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // This function now handles both the check and the potential success action
    const checkAndSubmitName = async (value) => {
        if (!value) return; // Prevent API call on empty value
        setIsChecking(true);
        setIsSuccess(false); // Reset success state on new input
        setMessage('');

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
                setIsSuccess(true); // Set success state to true
                showSuccess("Page name set successfully!");
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

    // Use a ref for the debounced function
    const debouncedSubmit = useRef(debounce(checkAndSubmitName, 900)).current;

    const handleChange = (e) => {
        const value = e.target.value.split(" ").join("").toLowerCase();
        setInputValue(value);
        const notAllowedNames = [
            "dashboard", "analytics", "setpagename", "api", "login", "signUp", "verification", "error", "junction",
        ]
        if(notAllowedNames.includes(value)){
            showInfo("The Name is not proper..")
            return 
        }
        if (value) debouncedSubmit(value);

    };

    // This new function now calls the onSuccess prop
    const handleProceed = () => {
        if (isSuccess && onSuccess) {
            onSuccess();
        } else {
            showInfo("Please choose a valid page name first.");
        }
    };

    return (
        <div className="flex items-center justify-center h-[89vh] p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="p-6 sm:p-8 rounded-xl shadow-2xl transition-colors duration-300 w-full max-w-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white">

                <h1 className="text-2xl font-bold text-center sm:text-3xl text-orange-500">
                    Welcome, {name} 👋
                </h1>
                <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Choose a unique name for your public URL.
                </p>

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
                        onClick={handleProceed}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2.5 rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
                        disabled={!isSuccess} // Button is only enabled on success
                    >
                        {isChecking ? 'Checking...' : 'Proceed'}
                    </button>
                </div>

                {message && inputValue !== "" && (
                    <p className={`mt-3 text-sm text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
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
