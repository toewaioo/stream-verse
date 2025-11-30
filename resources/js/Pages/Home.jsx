import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import SeoHead from "@/Components/SeoHead";

import Navbar from "@/Components/Navbar";
import MediaCard from "@/Components/MediaCard";
import Footer from "@/Components/Footer";
import LoadingLayout from "@/Layouts/LoadingLayout";

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const SectionTitle = ({ title, subtitle, href }) => (
    <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">
                    {subtitle}
                </p>
            )}
        </div>
        <Link
            href={href}
            className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
        >
            View All
        </Link>
    </div>
);

export default function Home({ featured, latestMovies, latestSeries, seo }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!featured || featured.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === featured.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval);
    }, [featured]);

    return (
        <LoadingLayout>
            <>
                <SeoHead
                    title={seo?.title}
                    description={seo?.description}
                    keywords={seo?.keywords}
                    url={seo?.url}
                    image={seo?.image}
                    type="website"
                    structuredData={seo?.structuredData}
                />

                <div className="min-h-screen mt-0 bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
                    <Navbar />
                    {/* --- HERO SECTION --- */}
                    {/* --- HERO SECTION --- */}
                    {featured && featured.length > 0 && (
                        <div className="relative h-[85vh] w-full overflow-hidden group">
                            {featured.map((item, index) => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${
                                        index === currentIndex
                                            ? "opacity-100 z-10"
                                            : "opacity-0 z-0"
                                    }`}
                                >
                                    <img
                                        src={item.poster_url}
                                        alt={item.title}
                                        className="block md:hidden w-full h-full object-cover"
                                    />
                                    <img
                                        src={item.banner_url}
                                        alt={item.title}
                                        className="hidden md:block w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>

                                    <div className="absolute inset-0 flex items-center">
                                        <div className="container mx-auto px-6 md:px-12">
                                            <div className="max-w-2xl">
                                                <span className="inline-block px-2 py-1 border border-white/30 text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6 backdrop-blur-sm">
                                                    Featured{" "}
                                                    {item.type === "series"
                                                        ? "Series"
                                                        : "Film"}
                                                </span>
                                                <h1 className="text-5xl line-clamp-1 md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-6">
                                                    {item.title}
                                                </h1>
                                                <p className="text-lg md:text-xl text-gray-300 font-serif leading-relaxed mb-8 line-clamp-3 max-w-xl">
                                                    {item.description}
                                                </p>

                                                <div className="flex items-center gap-4">
                                                    <Link
                                                        href={
                                                            item.type ===
                                                            "series"
                                                                ? route(
                                                                      "series.show",
                                                                      item.slug
                                                                  )
                                                                : route(
                                                                      "movies.show",
                                                                      item.slug
                                                                  )
                                                        }
                                                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                                                    >
                                                        Watch Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination Dots */}
                            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
                                {featured.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentIndex
                                                ? "bg-white scale-125"
                                                : "bg-white/30 hover:bg-white/50"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- CONTENT SECTIONS --- */}
                    <div className="container mx-auto px-6 md:px-12 py-20 space-y-24">
                        {/* Latest Movies */}
                        <section>
                            <SectionTitle
                                title="New Releases"
                                subtitle="Fresh from the cinema"
                                href={route("movies.index")}
                            />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                                {latestMovies.map((movie) => (
                                    <MediaCard
                                        key={movie.id}
                                        item={movie}
                                        type="movie"
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Latest Series */}
                        <section>
                            <SectionTitle
                                title="Latest Series"
                                subtitle="Binge-worthy collections"
                                href={route("series.index")}
                            />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                                {latestSeries.map((series) => (
                                    <MediaCard
                                        key={series.id}
                                        item={series}
                                        type="series"
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* --- FOOTER --- */}
                    <Footer />
                </div>
            </>
        </LoadingLayout>
    );
}
