import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "@inertiajs/react";
import SeoHead from "@/Components/SeoHead";
import Navbar from "@/Components/Navbar";
import MediaCard from "@/Components/MediaCard";
import Footer from "@/Components/Footer";
import { useTranslation } from "react-i18next";

// Optimized SectionTitle
const SectionTitle = React.memo(({ title, subtitle, href }) => {
    const { t } = useTranslation();
    return (
        <div className="mb-8 flex items-end justify-between border-b border-gray-200 dark:border-white/10 pb-4">
            <div>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 dark:text-white">
                    {t(title)}
                </h2>
                {subtitle && (
                    <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">
                        {t(subtitle)}
                    </p>
                )}
            </div>
            <Link
                href={href}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 dark:hover:text-white uppercase tracking-widest transition-colors"
            >
                {t('View All')}
            </Link>
        </div>
    );
});

// Custom hook for preloading images
const useImagePreloader = (imageUrls) => {
    useEffect(() => {
        imageUrls.forEach((url) => {
            if (url) {
                const img = new Image();
                img.src = url;
            }
        });
    }, [imageUrls]);
};

export default function Home({ featured, latestMovies, latestSeries, seo }) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isSliding, setIsSliding] = useState(false);

    const featuredItems = useMemo(() => featured || [], [featured]);

    // Preload all featured images
    const imageUrlsToPreload = useMemo(() =>
        featuredItems.flatMap(item => [item.poster_url, item.banner_url]).filter(Boolean),
        [featuredItems]
    );
    useImagePreloader(imageUrlsToPreload);


    const handleSlideChange = useCallback((newIndex) => {
        if (isSliding) return;
        setIsSliding(true);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsSliding(false), 700); // Match transition duration
    }, [isSliding]);


    useEffect(() => {
        if (featuredItems.length === 0) return;

        const interval = setInterval(() => {
            const newIndex = (currentIndex + 1) % featuredItems.length;
            handleSlideChange(newIndex);
        }, 6000);

        return () => clearInterval(interval);
    }, [featuredItems.length, currentIndex, handleSlideChange]);


    const handleTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            handleSlideChange((currentIndex + 1) % featuredItems.length);
        }
        if (isRightSwipe) {
            handleSlideChange((currentIndex - 1 + featuredItems.length) % featuredItems.length);
        }

        setTouchStart(null);
        setTouchEnd(null);
    }, [touchStart, touchEnd, currentIndex, featuredItems.length, handleSlideChange]);

    const currentItem = useMemo(() => featuredItems[currentIndex], [featuredItems, currentIndex]);

    return (
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

            <div className="min-h-screen mt-0 bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
                <Navbar />

                {/* --- HERO SECTION (Optimized) --- */}
                {currentItem && (
                    <div
                        className="relative h-[85vh] w-full overflow-hidden group"
                        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                        onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className={`absolute inset-0 transition-opacity duration-700 `}
                        >
                            <img
                                src={currentItem.poster_url}
                                alt={currentItem.title}
                                className="block md:hidden w-full h-full object-cover"
                                loading="eager" // Eager load the main visible image
                            />
                            <img
                                src={currentItem.banner_url}
                                alt={currentItem.title}
                                className="hidden md:block w-full h-full object-cover"
                                loading="eager" // Eager load the main visible image
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#050505] via-gray-100/40 dark:via-[#050505]/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 dark:from-[#050505] via-gray-100/60 dark:via-[#050505]/60 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-6 md:px-12">
                                    <div className="max-w-2xl">
                                        <span className="inline-block px-2 py-1 border border-gray-800/30 dark:border-white/30 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 dark:text-white mb-6 backdrop-blur-sm">
                                            {t('Featured')}{" "}
                                            {currentItem.type === "series" ? t("Series") : t("Film")}
                                        </span>
                                        <h1 className="text-4xl line-clamp-1 md:text-7xl lg:text-8xl font-serif text-gray-800 dark:text-white leading-[0.9] mb-6">
                                            {currentItem.title}
                                        </h1>
                                        <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed mb-8 line-clamp-3 max-w-xl">
                                            {currentItem.description}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={
                                                    currentItem.type === "series"
                                                        ? route("series.show", currentItem.slug)
                                                        : route("movies.show", currentItem.slug)
                                                }
                                                className="px-2 md:px-8 text-sm md:text-lg py-3 bg-gray-800 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
                                            >
                                                {t('Watch Now')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
                            {featuredItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSlideChange(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-gray-800 dark:bg-white scale-125"
                                        : "bg-gray-800/30 dark:bg-white/30 hover:bg-gray-800/50 dark:hover:bg-white/50"
                                        }`}
                                    aria-label={`${t('Go to slide')} ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- CONTENT SECTIONS --- */}
                <div className="container mx-auto px-2 md:px-12 py-20 space-y-10">
                    <section>
                        <SectionTitle
                            title="New Releases"
                            subtitle="Fresh from the cinema"
                            href={route("movies.index")}
                        />
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                            {latestMovies.map((movie) => (
                                <MediaCard
                                    key={`movie-${movie.id}`}
                                    item={movie}
                                    type="movie"
                                />
                            ))}
                        </div>
                    </section>

                    <section className="mt-0">
                        <SectionTitle
                            title="Latest Series"
                            subtitle="Binge-worthy collections"
                            href={route("series.index")}
                        />
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                            {latestSeries.map((series) => (
                                <MediaCard
                                    key={`series-${series.id}`}
                                    item={series}
                                    type="series"
                                />
                            ))}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    );
}
