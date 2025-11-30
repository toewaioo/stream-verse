import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Loader from "@/Components/Loader";
export default function LoadingLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const { props } = usePage();
    useEffect(() => {
        const minSplashTime = 500;
        const timeout = setTimeout(() => {
            setLoading(false);
        }, minSplashTime);
        return () => clearTimeout(timeout);
    }, []);
    if (loading) {
        return (
            <>
                <Loader />
            </>
        );
    }

    return <>{children}</>;
}
