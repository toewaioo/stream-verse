import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    build: {
        sourcemap: false,
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            ssr: "resources/js/ssr.jsx",
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.ico",
                "apple-touch-icon.png",
                "masked-icon.svg",
                "offline.html" // Ensure offline page is cached
            ],
            manifest: {
                name: "Cineverse",
                short_name: "Cineverse",
                description: "Your Ultimate Movie & Series Destination",
                theme_color: "#050505",
                background_color: "#050505",
                start_url: "/",
                display: "standalone",
                scope: "/",
                icons: [
                    { src: '/images/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
                    { src: '/images/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
                    { src: '/images/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
                    { src: '/images/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
                    { src: '/images/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
                    { src: '/images/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/images/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
                    { src: '/images/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
                    { src: '/images/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'apple touch icon' },
                    { src: '/images/icons/maskable_icon.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' }
                ],
                // Add screenshots for a richer install prompt.
                // Replace these with actual screenshot URLs of your app.
                screenshots: [
                    {
                        src: "/images/screenshots/screenshot-1.png",
                        sizes: "1280x720",
                        type: "image/png",
                        form_factor: "wide"
                    },
                    {
                        src: "/images/screenshots/screenshot-2.png",
                        sizes: "720x1280",
                        type: "image/png",
                        form_factor: "narrow"
                    }
                ]
            },
            workbox: {
                // Define a fallback for when the user is offline and navigates to a page
                // that hasn't been cached.
                navigateFallback: '/offline.html',
                // Ensure that only navigation requests (e.g., for pages) use the fallback.
                // It prevents assets like images or CSS from being redirected to the HTML page.
                navigateFallbackAllowlist: [/^\/$/] // Adjust this regex if you have other top-level pages
            }
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
