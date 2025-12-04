import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import MediaCard from "@/Components/MediaCard";
import SeoHead from "@/Components/SeoHead";
import LoadingLayout from "@/Layouts/LoadingLayout";
import { useTranslation } from "react-i18next";
export default function GenreShow({ genre, movies, series, seo }) {
    const [activeTab, setActiveTab] = useState("movies");
    const {t} = useTranslation();
    const handlePageChange = (url, type) => {
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    };
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.BackButton.show();

        tg.onEvent("backButtonClicked", () => {
            const prevRoute =
                sessionStorage.getItem("tgPrevRoute") || route("home");
            router.visit(prevRoute);
        });
    }, []);

    const PaginationControls = ({ data, type }) => {
        if (!data.links || data.links.length <= 3) return null;

        return (
            <div className="flex justify-center items-center gap-2 mt-12">
                {data.links.map((link, index) => {
                    if (!link.url) {
                        return (
                            <span
                                key={index}
                                className="px-4 py-2 text-gray-600 cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link.url, type)}
                            className={`px-4 py-2 transition-colors ${
                                link.active
                                    ? "dark:bg-white dark:text-black font-bold"
                                    : "dark:bg-white/5 dark:text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <LoadingLayout>
            <>
                <SeoHead
                    title={seo?.title}
                    description={seo?.description}
                    keywords={seo?.keywords}
                    type="website"
                />

                <div className="min-h-screen bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
                    <Navbar />

                    {/* Hero Section */}
                    <div className="relative h-[30vh] md:h-[40vh] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-white to-blue-200 dark:from-purple-900/30 dark:via-black dark:to-blue-900/30">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="container mx-auto px-6 md:px-12 text-center">
                                <div className="inline-block px-3 py-1 border border-gray-800/30 dark:border-white/30 text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-white mb-4 backdrop-blur-sm">
                                    {t('Genre')}
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-800 dark:text-white leading-tight mb-4">
                                    {genre.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                                    {t(`Explore ${movies.total + series.total} movies and series in this genre`, { count: movies.total + series.total })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="container mx-auto px-6 md:px-12 py-2">
                        {/* Tabs */}
                        <div className="flex gap-4 mb-12 border-b border-gray-200 dark:border-white/10">
                            <button
                                onClick={() => setActiveTab("movies")}
                                className={`px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${
                                    activeTab === "movies"
                                        ? "text-gray-800 dark:text-white"
                                        : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                            >
                                {t(`Movies (${movies.total})`, { count: movies.total })}
                                {activeTab === "movies" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("series")}
                                className={`px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${
                                    activeTab === "series"
                                        ? "text-gray-800 dark:text-white"
                                        : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                            >
                                {t(`Series (${series.total})`, { count: series.total })}
                                {activeTab === "series" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white"></div>
                                )}
                            </button>
                        </div>

                        {/* Movies Tab */}
                        {activeTab === "movies" && (
                            <div>
                                {movies.data.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                                            {movies.data.map((movie) => (
                                                <MediaCard
                                                    key={movie.id}
                                                    item={movie}
                                                    type="movie"
                                                />
                                            ))}
                                        </div>
                                        <PaginationControls
                                            data={movies}
                                            type="movies"
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg">
                                            {t('No movies found in this genre.')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Series Tab */}
                        {activeTab === "series" && (
                            <div>
                                {series.data.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                                            {series.data.map((item) => (
                                                <MediaCard
                                                    key={item.id}
                                                    item={item}
                                                    type="series"
                                                />
                                            ))}
                                        </div>
                                        <PaginationControls
                                            data={series}
                                            type="series"
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg">
                                            {t('No series found in this genre.')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Footer />
                </div>
            </>
        </LoadingLayout>
    );
}
