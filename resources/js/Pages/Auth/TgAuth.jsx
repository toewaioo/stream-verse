/**
 * TgAuth - Telegram Mini App Authentication Page (Optimized)
 *
 * This page handles automatic authentication for users accessing the app
 * via Telegram Mini App. It's optimized for speed to make the login
 * feel as close to instant as possible.
 *
 * 1. Immediately checks for Telegram environment and initData.
 * 2. If not a valid Mini App context, redirects to home instantly.
 * 3. If user is already logged in, redirects to home instantly.
 * 4. Attempts auto-login and redirects immediately on success.
 * 5. Shows a clean loader during the very brief authentication attempt.
 */

import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import Loader from "@/Components/Loader";

export default function TgAuth({ auth }) {
    const loginAttempted = useRef(false);
    const [status, setStatus] = useState("Initializing...");
    const [error, setError] = useState(null);

    useEffect(() => {
        // If user is already authenticated, just redirect.
        if (auth.user) {
            setStatus("Already logged in. Redirecting...");
            router.visit(route("home"), { replace: true });
            return;
        }

        const tg = window.Telegram?.WebApp;

        // If not in a Telegram Mini App or no initData, redirect.
        if (!tg || !tg.initData) {
            setStatus("Not a Mini App. Redirecting...");
            router.visit(route("home"), { replace: true });
            return;
        }

        // If we reach here, it's a Mini App context without a session.
        // Let's attempt to log in.
        if (!loginAttempted.current) {
            loginAttempted.current = true;
            setStatus("Authenticating...");
            tg.ready();

            axios
                .post(route("auth.telegram.mini-app"), {
                    initData: tg.initData,
                })
                .then(() => {
                    setStatus("Success! Redirecting...");
                    // On successful login, Inertia will automatically get the new user state.
                    // We can simply redirect to the home page.
                    router.visit(route("home"), { replace: true });
                })
                .catch((err) => {
                    console.error("Telegram authentication failed:", err.response?.data || err.message);
                    setError(
                        `Authentication failed. Please try again or contact support. (Reason: ${err.response?.data?.message || 'Unknown Error'})`
                    );
                    setStatus("Authentication Failed");
                });
        }
    }, [auth.user]); // Only re-run if the user state changes.

    // If there's an error, we show it and provide a manual way to proceed.
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#050505] text-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h1>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => router.visit(route("home"), { replace: true })}
                        className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded"
                    >
                        Continue to Home
                    </button>
                </div>
            </div>
        );
    }

    // Default view while authenticating
    return <Loader title="Authentication" status={status} />;
}
