import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import Loader from "@/Components/Loader";

export default function TgAuth({ user }) {
    const loginAttempted = useRef(false);
    const [logs, setLogs] = useState([]);
    const [status, setStatus] = useState("Initializing...");

    const addLog = (message, type = "info") => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, { timestamp, message, type }]);
        console.log(`[${timestamp}] ${message}`);
    };

    useEffect(() => {
        addLog("TgAuth page mounted");

        const tg = window.Telegram?.WebApp;

        if (!tg) {
            addLog("Not Telegram Mini App", "warning");
            setStatus("Not a Telegram Mini App");

            setTimeout(() => router.visit(route("home")), 2000);
            return;
        }

        tg.ready();
        addLog("Mini App detected", "success");

        if (user) {
            addLog("User already logged in", "success");
            setStatus("Already logged in! Redirecting...");

            return setTimeout(() => {
                router.visit(route("home"));
            }, 1500);
        }

        if (!tg.initData) {
            addLog("Telegram initData missing!", "error");
            setStatus("No Telegram data available");
            return;
        }

        addLog(`initData detected`, "success");

        if (!loginAttempted.current) {
            loginAttempted.current = true;

            setStatus("Authenticating with Telegram...");
            addLog("Sending initData to backend via Inertia...", "info");

            router.post(
                "/auth/telegram/mini-app",
                { initData: tg.initData },
                {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        addLog("Login success!", "success");
                        addLog(JSON.stringify(page.props), "info");

                        setStatus("Login successful! Redirecting...");

                        setTimeout(() => {
                            router.visit(route("home"));
                        }, 1200);
                    },
                    onError: (errors) => {
                        addLog("Login failed!", "error");
                        addLog(JSON.stringify(errors), "error");

                        setStatus("Login failed");
                        loginAttempted.current = false;
                    },
                }
            );
        }
    }, [user]);

    const logColor = (t) =>
        t === "success"
            ? "text-green-400"
            : t === "error"
            ? "text-red-400"
            : t === "warning"
            ? "text-yellow-400"
            : "text-gray-300";

    return (
        <div className="min-h-screen bg-black text-white flex justify-center p-6">
            <div className="w-full max-w-2xl">
                {/* <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-4">
                    <div className="flex justify-center mb-3">
                        <Loader />
                    </div>
                    <h1 className="text-center text-2xl font-bold mb-2">
                        Telegram Authentication
                    </h1>
                    <p className="text-center text-gray-300 text-lg">
                        {status}
                    </p>
                </div> */}

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h2 className="font-bold mb-2">Developer Logs</h2>
                    <div className="bg-black p-3 rounded text-sm max-h-80 overflow-y-auto">
                        {logs.map((l, i) => (
                            <div key={i} className={logColor(l.type)}>
                                <span className="text-gray-500 mr-1">
                                    [{l.timestamp}]
                                </span>
                                {l.message}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={() => router.visit(route("home"))}
                        className="px-5 py-2 bg-white text-black rounded font-bold"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}
