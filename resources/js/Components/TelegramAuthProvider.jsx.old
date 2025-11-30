import { useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function TelegramAuthProvider({ children, user }) {
    const loginAttempted = useRef(false);

    useEffect(() => {
        console.log('TelegramAuthProvider mounted');
        console.log('User:', user);
        console.log('window.Telegram:', window.Telegram);

        // Check if running in Telegram Mini App
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            console.log('Telegram WebApp detected');
            console.log('initData:', tg.initData);

            tg.ready();

            // If not authenticated and we have initData, try to login
            // Use ref to prevent multiple login attempts
            if (!user && tg.initData && !loginAttempted.current) {
                loginAttempted.current = true;
                console.log('Attempting to login via Mini App...');

                axios
                    .post('/auth/telegram/mini-app', {
                        initData: tg.initData,
                    })
                    .then((response) => {
                        console.log('Login success:', response.data);
                        // Use router.visit to properly reload with new auth state
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error("Telegram Mini App Login Failed:", error);
                        if (error.response) {
                            console.error("Error response:", error.response.data);
                            console.error("Error status:", error.response.status);
                        }
                        loginAttempted.current = false; // Allow retry on error
                    });
            } else {
                if (user) {
                    console.log('User already logged in');
                } else if (!tg.initData) {
                    console.log('No initData available');
                } else if (loginAttempted.current) {
                    console.log('Login already attempted');
                }
            }
        } else {
            console.log('Not running in Telegram WebApp');
        }
    }, []); // Remove user from dependencies to prevent re-runs

    return children;
}
