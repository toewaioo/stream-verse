import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import MediaCard from "@/Components/MediaCard";
import SeoHead from "@/Components/SeoHead";
import LoadingLayout from "@/Layouts/LoadingLayout";

export default function PersonShow({ person, movies, series, seo }) {
    console.log(person);
    const [activeTab, setActiveTab] = useState("movies");

    const handlePageChange = (url, type) => {
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    };

    const PaginationControls = ({ data, type }) => {
        if (!data.links || data.links.length <= 3) return null;
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
                                    ? "bg-white text-black font-bold"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
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
                    type="profile"
                />

                <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
                    <Navbar />

                    {/* Hero Section */}
                    <div className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-black to-red-900/30">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                            </div>
                        </div>
                        {/* <div className="flex-shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 border-4 border-black/50">
                                <span className="text-3xl md:text-4xl font-bold text-white tracking-wider">
                                    
                                </span>
                            </div>
                        </div> */}
                        <div className="absolute inset-0 flex items-center justify-center pt-24">
                            <div className="container mx-auto px-6 md:px-12 text-center">
                                {person.avatar_url && (
                                    <div className="mb-6 flex justify-center">
                                        <img
                                            src={person.avatar_url}
                                            alt={person.name}
                                            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20"
                                        />
                                    </div>
                                )}
                                <div className="inline-block px-3 py-1 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-4 backdrop-blur-sm">
                                    Filmography
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-4">
                                    {person.name}
                                </h1>
                                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                                    {movies.total + series.total} titles
                                    featuring this talent
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="container mx-auto px-6 md:px-12 py-2">
                        {/* Biography (if available) */}
                        {person.biography && (
                            <div className="mb-2 max-w-4xl mx-auto">
                                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                                    <h2 className="text-2xl font-serif text-white mb-4 border-b border-white/10 pb-3">
                                        Biography
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        {person.biography}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="flex gap-4 mb-12 border-b border-white/10">
                            <button
                                onClick={() => setActiveTab("movies")}
                                className={`px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${
                                    activeTab === "movies"
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                Movies ({movies.total})
                                {activeTab === "movies" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("series")}
                                className={`px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative ${
                                    activeTab === "series"
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                Series ({series.total})
                                {activeTab === "series" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
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
                                            No movies found featuring this
                                            person.
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
                                            No series found featuring this
                                            person.
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
