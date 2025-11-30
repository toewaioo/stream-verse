import React, { useEffect, useRef } from 'react';

export default function TelegramLoginWidget({ botName, buttonSize = 'large', cornerRadius = 20, requestAccess = 'write' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!botName) return;

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', buttonSize);
        script.setAttribute('data-radius', cornerRadius);
        script.setAttribute('data-request-access', requestAccess);
        script.setAttribute('data-auth-url', route('auth.telegram.callback'));
        script.async = true;

        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(script);
        }
    }, [botName, buttonSize, cornerRadius, requestAccess]);

    return <div ref={containerRef} className="flex justify-center mt-4" />;
}
