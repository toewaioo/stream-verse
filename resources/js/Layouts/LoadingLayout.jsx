import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function LoadingLayout({ children }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => setLoading(true);
        const finish = () => setLoading(false);

        router.on("start", start);
        router.on("finish", finish);

        return () => {
            router.off("start", start);
            router.off("finish", finish);
        };
    }, []);

    return (
        <>
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(255,255,255,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        fontSize: "2rem",
                    }}
                >
                    Loading...
                </div>
            )}
            {children}
        </>
    );
}