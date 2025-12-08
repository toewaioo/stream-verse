import React, { useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import MediaCard from "@/Components/MediaCard";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { useTranslation } from "react-i18next";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Pagination = ({ links }) => {
    return (
        <div className="flex justify-center mt-8 mb-5 gap-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ? link.url : "#"}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        link.active
                            ? "dark:bg-white text-black"
                            : "dark:bg-white/10 dark:text-white hover:bg-white/20"
                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    disabled={!link.url}
                />
            ))}
        </div>
    );
};

export default function Index({ movies }) {
    const { t } = useTranslation();
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.BackButton.show();

        tg.onEvent("backButtonClicked", () => {
            window.history.back();
            //const prevRoute =
            //     sessionStorage.getItem("tgPrevRoute") || route("home");
            // router.visit(prevRoute, {
            //     preserveState: true,
            //     preserveScroll: true,
            // });
        });
        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick();
        };
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title={t("Movies")} />
            {/* <Navbar /> */}
            <div className="min-h-screen py-16  bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black pb-12">
                <div className="container mx-auto px-2 md:px-12 py-4">
                    <div className="mb-4 border-b border-gray-200 dark:border-white/10 pt-2">
                        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 dark:text-white">
                            {t("Movies")}
                        </h1>
                        {/* <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
                            Browse all available films
                        </p> */}
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 md:gap-x-4 gap-y-8">
                        {movies.data.map((movie) => (
                            <MediaCard
                                key={movie.id}
                                item={movie}
                                type="movie"
                            />
                        ))}
                    </div>

                    {movies.links && movies.links.length > 3 && (
                        <Pagination links={movies.links} />
                    )}
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
