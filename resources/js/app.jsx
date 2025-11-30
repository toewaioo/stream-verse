import "../css/app.css";
import "./bootstrap";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
    registerSW({ immediate: true });
}

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Loader from "./Components/Loader";
import TelegramAuthProvider from "./Components/TelegramAuthProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
// Render a loading screen before the app is ready
// const el = document.getElementById("app");
// const root = createRoot(el);
// root.render(<Loader />);
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {

        const root = createRoot(el);

        root.render(
            <TelegramAuthProvider user={props.initialPage.props.auth.user}>
                <App {...props} />
            </TelegramAuthProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
