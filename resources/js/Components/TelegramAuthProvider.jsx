import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

export default function TelegramAuthProvider({ children, user }) {
    useEffect(() => {
        // Check if running in Telegram Mini App
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            // If not authenticated and we have initData, try to login
            if (!user && tg.initData) {
                axios.post(route('auth.telegram.mini-app'), {
                    initData: tg.initData
                })
                    .then(() => {
                        // Reload to reflect auth state
                        router.reload();
                    })
                    .catch((error) => {
                        console.error('Telegram Mini App Login Failed:', error);
                    });
            }
        }
    }, [user]);

    return children;
}
