/**
 * TgAuth - Telegram Mini App Authentication Page
 *
 * This page handles automatic authentication for users accessing the app
 * via Telegram Mini App. It:
 *
 * 1. Detects if running in Telegram Mini App environment
 * 2. Attempts auto-login using Telegram initData
 * 3. Shows comprehensive logs for development/debugging
 * 4. Redirects to home page after successful authentication
 *
 * Route: /tgauth
 *
 * Set this page as the entry point in your Telegram Bot settings:
 * BotFather → Web App → https://yourdomain.com/tgauth
 */

import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import Loader from "@/Components/Loader";

export default function TgAuth({ user }) {
    const loginAttempted = useRef(false);
    const [logs, setLogs] = useState([]);
    const [status, setStatus] = useState("Initializing...");

    // Helper function to add logs
    const addLog = (message, type = "info") => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, { timestamp, message, type }]);
        console.log(`[${timestamp}] ${message}`);
    };

    useEffect(() => {
        addLog("TgAuth page mounted", "info");
        addLog(`User authenticated: ${!!user}`, "info");

        // Check if running in Telegram Mini App
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            addLog("Telegram WebApp detected", "success");
            addLog(`initData present: ${!!tg.initData}`, "info");

            if (tg.initData) {
                addLog(`initData: ${tg.initData.substring(0, 50)}...`, "info");
            }

            tg.ready();
            addLog("Telegram WebApp ready", "success");

            // If already authenticated, redirect to home
            if (user) {
                addLog(
                    "User already authenticated, redirecting to home...",
                    "success"
                );
                setStatus("Already logged in! Redirecting...");
                setTimeout(() => {
                    router.visit(route("home"));
                }, 1500);
                return;
            }

            // If not authenticated and we have initData, try to login
            if (!user && tg.initData && !loginAttempted.current) {
                loginAttempted.current = true;
                setStatus("Authenticating with Telegram...");
                addLog("Attempting to login via Mini App...", "info");

                axios
                    .post(route("auth.telegram.mini-app"), {
                        initData: tg.initData,
                    })
                    .then((response) => {
                        addLog("Login successful!", "success");
                        addLog(
                            `Response: ${JSON.stringify(response.data)}`,
                            "info"
                        );
                        setStatus("Login successful! Redirecting to home...");

                        // Redirect to home page after successful login
                        setTimeout(() => {
                            router.visit(route("home"));
                        }, 1500);
                    })
                    .catch((error) => {
                        addLog("Login failed!", "error");
                        setStatus("Authentication failed");

                        if (error.response) {
                            addLog(
                                `Error status: ${error.response.status}`,
                                "error"
                            );
                            addLog(
                                `Error data: ${JSON.stringify(
                                    error.response.data
                                )}`,
                                "error"
                            );
                        } else if (error.request) {
                            addLog("No response received from server", "error");
                        } else {
                            addLog(`Error: ${error.message}`, "error");
                        }

                        loginAttempted.current = false; // Allow retry on error
                    });
            } else {
                if (!tg.initData) {
                    addLog(
                        "No initData available - cannot authenticate",
                        "warning"
                    );
                    setStatus("Loading ...");
                    setTimeout(() => {
                        addLog("Redirecting to home page...", "info");
                        router.visit(route("home"));
                    }, 3000);
                } else if (loginAttempted.current) {
                    addLog("Login already attempted", "info");
                    setStatus("Authenticate success");
                    setTimeout(() => {
                        addLog("Redirecting to home page...", "info");
                        router.visit(route("home"));
                    }, 3000);
                }
            }
        } else {
            addLog("Not running in Telegram WebApp environment", "warning");
            setStatus("Loading ....");

            // Redirect to regular home page if not in Telegram
            setTimeout(() => {
                addLog("Redirecting to home page...", "info");
                router.visit(route("home"));
            }, 3000);
        }
    }, [user]);

    const getLogColor = (type) => {
        switch (type) {
            case "success":
                return "text-green-400";
            case "error":
                return "text-red-400";
            case "warning":
                return "text-yellow-400";
            default:
                return "text-gray-300";
        }
    };

    return (
        <>
            {/* Status Card */}
            <Loader title={"Authentication"} status={status} />

            {user && (
                <div className="text-center text-sm text-green-400">
                    ✓ Logged in as: {user.name || user.email}
                </div>
            )}

            {/* Developer Logs */}
            {/* <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <span className="mr-2">🔧</span>
                        Developer Logs
                    </h2>
                    <div className="bg-black rounded-md p-4 max-h-96 overflow-y-auto font-mono text-sm">
                        {logs.length === 0 ? (
                            <p className="text-gray-500">No logs yet...</p>
                        ) : (
                            logs.map((log, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 ${getLogColor(log.type)}`}
                                >
                                    <span className="text-gray-500 mr-2">
                                        [{log.timestamp}]
                                    </span>
                                    <span>{log.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div> */}

            {/* Manual Navigation */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => router.visit(route("home"))}
                    className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded"
                >
                    Go to Home
                </button>
            </div>
        </>
    );
}
