'use client';
import React, { useRef, useState, useEffect } from 'react';
// Removed problematic external import: import Loader from "@/Components/Workers/Loader";

// --- MOCK TOAST FUNCTIONS RESTORED (They must be defined to prevent crashing) ---
const showSuccess = (message) => console.log("✅ Success:", message);
const showError = (message) => console.error("❌ Error:", message);
const showInfo = (message) => console.warn("💡 Info:", message);
// -----------------------------------------------------------

// --- SELF-CONTAINED LOADER COMPONENT (Replaces the external import) ---
const CustomLoader = () => (
    <div className="flex items-center justify-center h-[89vh] bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="flex flex-col items-center">
            {/* Simple Tailwind-styled SVG spinner */}
            <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">Loading and redirecting...</p>
        </div>
    </div>
);
// ---------------------------------------------------------------------

/**
 * A component to set a unique page name for the user's public URL.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user data object.
 * @param {Function} props.sessionUpdate - The next-auth `update` function to refresh the session.
 */
const SetPageNameCompo = ({ user, sessionUpdate }) => {
    // useRouter is no longer initialized here as it was removed to fix the error.

    const userData = user?.user || user;
    const existingUserName = userData?.userName || '';
    const [inputValue, setInputValue] = useState(existingUserName);
    const [isChecking, setIsChecking] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(!!existingUserName);
    const [loading, setLoading] = useState(false);

    const firstName = userData?.firstname || '';
    const lastName = userData?.lastname || '';
    const name = `${firstName} ${lastName}`.trim();

    // Sync input value when user data changes
    useEffect(() => {
        if (!userData) return;
        const currentUserName = userData?.userName || '';
        if (currentUserName !== inputValue) {
            setInputValue(currentUserName);
            setIsSuccess(!!currentUserName);
        }
    }, [userData?.userName, userData]);

    // Debounce function to delay API calls
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    /**
     * Handles checking availability, submitting the name, and updating the session.
     * @param {string} value - The page name to check and submit.
     * @returns {Promise<boolean>} True if successful, false otherwise.
     */
    const checkAndSubmitName = async (value) => {
        if (!value) return false;
        setIsChecking(true);
        setIsSuccess(false);
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
            console.log("API Response:", { status: res.status, ok: res.ok, result });

            if (res.ok && result.success) {
                // IMPORTANT: Update next-auth session immediately after DB write
                if (sessionUpdate) {
                    await sessionUpdate({ userName: value });
                }

                setMessage("✅ Page name set successfully.");
                setIsSuccess(true);
                showSuccess("Page name saved! Proceeding...");
                return true;
            } else if (result.exists) {
                setMessage("❌ Page name already exists.");
                setIsSuccess(false);
                showError("This page name is already taken.");
                return false;
            } else if (result.error) {
                showError(result.error);
                setMessage("⚠️ " + result.error);
                setIsSuccess(false);
                return false;
            } else {
                showError("Unknown server response.");
                setIsSuccess(false);
                return false;
            }
        } catch (err) {
            console.error("Error in checkAndSubmitName:", err);
            showError("Error while connecting to server.");
            setIsSuccess(false);
            return false;
        } finally {
            setIsChecking(false);
        }
    };

    const debouncedSubmit = useRef(debounce(checkAndSubmitName, 900)).current;

    const handleChange = (e) => {
        const value = e.target.value.split(" ").join("").toLowerCase();
        setInputValue(value);
        const notAllowedNames = [
            "dashboard", "analytics", "setpagename", "api", "login", "signUp", "verification", "error", "junction",
        ]
        if (notAllowedNames.includes(value)) {
            showInfo("The Name is not proper..")
            return
        }
        if (value) debouncedSubmit(value);
    };

    const handleProceed = async () => {
        if (!inputValue.trim()) {
            showInfo("Please enter a page name first.");
            return;
        }

        // If checking is in progress, do not proceed
        if (isChecking) {
            showInfo("Please wait while we check the page name...");
            return;
        }

        // Start loading indicator
        setLoading(true);

        // 1. Check if the current, successful name is being used. If so, just navigate smoothly via hard refresh.
        const normalizedInput = inputValue.toLowerCase().trim();
        const normalizedExisting = (existingUserName || '').toLowerCase().trim();

        if (normalizedInput === normalizedExisting && isSuccess) {
            // Use hard navigation to ensure full page load and middleware sync
            window.location.href = "/Dashboard";
            return;
        }

        // 2. Validate and set the new name
        try {
            const success = await checkAndSubmitName(inputValue);

            // 3. If successful, force a full navigation/reload to ensure middleware sync
            if (success) {
                // Use explicit hard navigation to the Dashboard page for reliable routing.
                window.location.href = "/Dashboard";
            } else {
                console.log("checkAndSubmitName failed, not redirecting");
            }
        } catch (error) {
            console.error("Error in handleProceed:", error);
            showError("An error occurred while processing your request.");
        } finally {
            // Only stop loading if navigation didn't happen (i.e., if 'success' was false)
            if (!isSuccess) {
                setLoading(false);
            }
        }
    };

    if (loading) {
        // Display the CustomLoader component while waiting for navigation
        return <CustomLoader />;
    }

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
                        disabled={!inputValue.trim() || isChecking} // Disable if input is empty or checking
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
                            <span className="text-orange-500">/{inputValue || 'your-page'}</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SetPageNameCompo;
