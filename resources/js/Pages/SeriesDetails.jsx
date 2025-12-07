import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import SeoHead from "@/Components/SeoHead";
import RatingWidget from "@/Components/Movie/RatingWidget";
import Review from "@/Components/Movie/Review";
import ReviewForm from "@/Components/Movie/ReviewForm";
import Footer from "@/Components/Footer";
import { useTranslation } from "react-i18next";
import axios from "axios";

// --- Components ---

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const DownloadIcon = ({ className = "w-6 h-6" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
    </svg>
);

const LinkItem = ({ link, type, isVip }) => {
    const { t } = useTranslation();
    const isLocked = link.is_vip_only && !isVip;

    return (
        <div
            className={`group flex items-center justify-around py-3 border-b border-white/5 hover:bg-white/5 transition-colors px-2 ${
                isLocked ? "opacity-50" : ""
            }`}
        >
            <div className="flex items-center justify-center gap-3 min-w-0">
                <div className="flex flex-col min-w-0">
                    <span className="dark:text-gray-300 font-serif text-sm leading-none truncate">
                        {link.server_name}
                    </span>
                </div>
            </div>
            <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    type === "download"
                        ? "border-blue-500 text-blue-500"
                        : "border-red-500 text-red-500"
                }`}
            >
                {link.quality?.replace("p", "") || "HD"}
            </div>

            <div className="flex items-center gap-2">
                {isLocked ? (
                    <span className="text-[10px] font-bold text-yellow-500 border border-yellow-500 px-1 uppercase">
                        {t("VIP")}
                    </span>
                ) : (
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            type === "download"
                                ? "bg-blue-600 hover:bg-blue-500 text-white"
                                : "bg-red-600 hover:bg-red-500 text-white"
                        }`}
                    >
                        <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
};

const EpisodeRow = ({ episode, isActive, onClick, isVip, isAuthenticated }) => {
    const { t } = useTranslation();
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                }`}
            >
                <div className="flex items-center gap-4">
                    <span className="text-gray-500 font-mono text-sm w-6">
                        {episode.episode_number.toString().padStart(2, "0")}
                    </span>
                    <div>
                        <h4
                            className={`font-serif text-lg leading-none ${
                                isActive
                                    ? "dark:text-white"
                                    : "dark:text-gray-300"
                            }`}
                        >
                            {episode.title}
                        </h4>
                        <span className="text-xs dark:text-gray-600 mt-1 block">
                            {episode.air_date
                                ? new Date(
                                      episode.air_date
                                  ).toLocaleDateString()
                                : t("Unknown Date")}
                        </span>
                    </div>
                </div>
                <div
                    className={`transform transition-transform ${
                        isActive ? "rotate-180" : ""
                    }`}
                >
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>

            {isActive && (
                <div className="p-4 bg-black/20 animate-fade-in">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {episode.poster_url && (
                            <div className="w-full md:w-32 aspect-video rounded overflow-hidden flex-shrink-0">
                                <img
                                    src={episode.poster_url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <p className="text-sm dark:text-gray-400 leading-relaxed font-serif">
                            {episode.description ||
                                t("No synopsis available for this episode.")}
                        </p>
                    </div>

                    {isAuthenticated ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div
                                className={`${
                                    episode.watch_links &&
                                    episode.watch_links.length > 0
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <PlayIcon className="w-3 h-3" />{" "}
                                    {t("Stream")}
                                </h5>
                                <div className="space-y-1">
                                    {episode.watch_links &&
                                    episode.watch_links.length > 0 ? (
                                        episode.watch_links.map((link) => (
                                            <LinkItem
                                                key={link.id}
                                                link={link}
                                                type="watch"
                                                isVip={isVip}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-gray-600 text-xs italic">
                                            {t("No sources.")}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`${
                                    episode.download_links &&
                                    episode.download_links.length > 0
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <DownloadIcon className="w-3 h-3" />{" "}
                                    {t("Download")}
                                </h5>
                                <div className="space-y-1">
                                    {episode.download_links &&
                                    episode.download_links.length > 0 ? (
                                        episode.download_links.map((link) => (
                                            <LinkItem
                                                key={link.id}
                                                link={link}
                                                type="download"
                                                isVip={isVip}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-gray-600 text-xs italic">
                                            {t("No sources.")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 border border-white/10 rounded bg-white/5 text-center">
                            <p className="text-gray-400 text-sm mb-2">
                                {t("Please log in to access episode links.")}
                            </p>
                            <a
                                href={route("login")}
                                className="inline-block px-4 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                            >
                                {t("Log In")}
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const TrailerModal = ({ url, onClose }) => {
    if (!url) return null;
    const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    )?.[1];
    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
        : null;

    if (!embedUrl) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-fade-in"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
                <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl">
                <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default function SeriesDetails({
    series: initialSeries,
    relatedSeries,
    userRating: initialUserRating,
    isVip,
    seo,
}) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [series, setSeries] = useState(initialSeries);
    const [userRating, setUserRating] = useState(initialUserRating);
    const [showTrailer, setShowTrailer] = useState(false);
    const [activeSeason, setActiveSeason] = useState(
        series.seasons?.[series.seasons?.length - 1] || null
    );
    const [expandedEpisodeId, setExpandedEpisodeId] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [userHasReviewed, setUserReviewed] = useState(false);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;
        tg.BackButton.show();
        tg.onEvent("backButtonClicked", () => window.history.back());
        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick();
        };
    }, []);

    useEffect(() => {
        if (activeSeason && activeSeason.episodes?.length > 0) {
            setExpandedEpisodeId(
                activeSeason.episodes[activeSeason.episodes.length - 1].id
            );
        }
    }, [activeSeason]);

    const handleRate = async (rating) => {
        const url = userRating
            ? route("api.ratings.update", userRating.id)
            : route("api.ratings.store");
        const method = userRating ? "put" : "post";

        try {
            const response = await axios[method](url, {
                rating,
                series_id: series.id,
            });
            const { rating: newRating } = response.data;
            setUserRating(newRating);
            setSeries((prevSeries) => ({
                ...prevSeries,
                rating_average: newRating.rating_average,
                rating_count: newRating.rating_count,
            }));
        } catch (error) {
            console.error("Failed to submit rating:", error);
        }
    };

    const handleReviewSubmit = async (reviewData) => {
        const url = reviewData.id
            ? route("api.reviews.update", reviewData.id)
            : route("api.series.reviews.store", series.id);
        const method = reviewData.id ? "put" : "post";

        try {
            const response = await axios[method](url, reviewData);
            const { review: newReview } = response.data;
            setSeries((prevSeries) => {
                const existingReviewIndex = prevSeries.reviews.findIndex(
                    (review) => review.id === newReview.id
                );
                if (existingReviewIndex !== -1) {
                    const updatedReviews = [...prevSeries.reviews];
                    updatedReviews[existingReviewIndex] = newReview;
                    return { ...prevSeries, reviews: updatedReviews };
                } else {
                    return {
                        ...prevSeries,
                        reviews: [...prevSeries.reviews, newReview],
                    };
                }
            });
            setEditingReviewId(null);
        } catch (error) {
            console.error("Failed to submit review:", error);
        }
    };

    const handleReviewDelete = async (reviewId) => {
        try {
            await axios.delete(route("api.reviews.destroy", reviewId));
            setSeries((prevSeries) => ({
                ...prevSeries,
                reviews: prevSeries.reviews.filter(
                    (review) => review.id !== reviewId
                ),
            }));
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    const scrollToEpisodes = () => {
        document
            .getElementById("episodes-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        const userHasReviewedd = series?.reviews?.some(
            (review) => review.user.id === auth.user?.id
        );
        setUserReviewed(userHasReviewedd);
    }, [series, auth.user]);

    return (
        <>
            <SeoHead
                title={seo?.title}
                description={seo?.description}
                keywords={seo?.keywords}
                url={seo?.url}
                image={seo?.image}
                type={seo?.type}
                structuredData={seo?.structuredData}
            />

            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e17] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300">
                <div className="relative w-full min-h-[85vh] md:min-h-[100vh] flex items-end pb-12 md:pb-24 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={series.banner_url}
                            alt={series.title}
                            className={`hidden md:block w-full h-full object-cover`}
                        />
                        <img
                            src={series.poster_url}
                            alt={series.title}
                            className={`block md:hidden w-full h-full object-cover`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0a0e17] via-gray-50/60 dark:via-[#0a0e17]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-[#0a0e17] via-gray-50/40 dark:via-[#0a0e17]/40 to-transparent" />
                        <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
                    </div>

                    <div className="relative z-10 container-custom w-full">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end">
                            <div className="hidden md:block w-64 lg:w-72 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 transform hover:scale-105 transition-transform duration-500">
                                <img
                                    src={series.poster_url}
                                    alt={series.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 w-full text-center md:text-left">
                                <div
                                    className="mb-4 animate-slide-up"
                                    style={{ animationDelay: "0.1s" }}
                                >
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-2 font-serif leading-tight drop-shadow-lg">
                                        {series.title}
                                    </h1>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-lg md:text-xl text-gray-500 dark:text-gray-400 font-serif italic">
                                        <span>{series.release_year_start}</span>
                                        {series.release_year_end && (
                                            <>
                                                <span>-</span>
                                                <span>
                                                    {series.release_year_end}
                                                </span>
                                            </>
                                        )}
                                        {!series.release_year_end && (
                                            <span>- Present</span>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mb-8 text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 animate-slide-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    {series.rating_average > 0 && (
                                        <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                                            <span>★</span>
                                            <span className="text-gray-900 dark:text-white">
                                                {series.rating_average}
                                            </span>
                                        </div>
                                    )}
                                    <span>
                                        {series.seasons?.length} {t("Seasons")}
                                    </span>
                                    {series.age_rating && (
                                        <span className="px-2 py-0.5 border border-gray-300 dark:border-white/20 rounded text-xs uppercase tracking-wider bg-gray-200 dark:bg-white/5">
                                            {series.age_rating}
                                        </span>
                                    )}
                                    {series.country && (
                                        <>
                                            <span className="hidden md:inline">
                                                •
                                            </span>
                                            <span>{series.country}</span>
                                        </>
                                    )}
                                    {series.view_count > 0 && (
                                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                            <span>{series.view_count}</span>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="flex flex-wrap justify-center md:justify-start gap-2 mb-8 animate-slide-up"
                                    style={{ animationDelay: "0.3s" }}
                                >
                                    {series.genres?.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="genre-pill"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    className="flex flex-wrap justify-center md:justify-start gap-4 animate-slide-up"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    <button
                                        onClick={scrollToEpisodes}
                                        className="btn-primary group"
                                    >
                                        <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        {t("Watch Episodes")}
                                    </button>
                                    {series.trailer_url && (
                                        <button
                                            onClick={() => setShowTrailer(true)}
                                            className="btn-secondary group"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {t("Trailer")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-custom py-12 md:py-20">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1">
                            <div className="mb-16">
                                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-[2px] bg-blue-500"></span>
                                    {t("Synopsis")}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed opacity-90">
                                    {series.description}
                                </p>
                            </div>

                            <div
                                id="episodes-section"
                                className="mb-16 scroll-mt-24"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-serif text-gray-900 dark:text-white flex items-center gap-3">
                                        <PlayIcon className="w-6 h-6 text-blue-500" />
                                        {t("Episode Guide")}
                                    </h3>
                                    {series.is_vip_only && (
                                        <span className="badge-vip">
                                            {t("VIP ACCESS")}
                                        </span>
                                    )}
                                </div>

                                {series.seasons && series.seasons.length > 0 ? (
                                    <div className="glass-card-adaptive overflow-hidden">
                                        <div className="flex overflow-x-auto p-4 gap-2 border-b border-gray-200 dark:border-white/5 custom-scrollbar bg-gray-100 dark:bg-black/20">
                                            {series.seasons
                                                .slice()
                                                .reverse()
                                                .map((season) => (
                                                    <button
                                                        key={season.id}
                                                        onClick={() =>
                                                            setActiveSeason(
                                                                season
                                                            )
                                                        }
                                                        className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                                            activeSeason?.id ===
                                                            season.id
                                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                                : "bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                                                        }`}
                                                    >
                                                        {t(
                                                            `Season ${season.season_number}`
                                                        )}
                                                    </button>
                                                ))}
                                        </div>

                                        <div className="divide-y divide-gray-200 dark:divide-white/5">
                                            {activeSeason?.episodes &&
                                            activeSeason.episodes.length > 0 ? (
                                                activeSeason.episodes
                                                    .slice()
                                                    .reverse()
                                                    .map((episode) => (
                                                        <EpisodeRow
                                                            key={episode.id}
                                                            episode={episode}
                                                            isActive={
                                                                expandedEpisodeId ===
                                                                episode.id
                                                            }
                                                            onClick={() =>
                                                                setExpandedEpisodeId(
                                                                    expandedEpisodeId ===
                                                                        episode.id
                                                                        ? null
                                                                        : episode.id
                                                                )
                                                            }
                                                            isVip={isVip}
                                                            isAuthenticated={
                                                                !!auth.user
                                                            }
                                                        />
                                                    ))
                                            ) : (
                                                <div className="p-12 text-center text-gray-500 italic">
                                                    {t(
                                                        "No episodes available for this season."
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 italic p-8 border border-gray-200 dark:border-white/10 rounded-lg text-center">
                                        {t("No seasons available.")}
                                    </div>
                                )}
                            </div>

                            <div className="mb-16">
                                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-2 h-[2px] bg-blue-500"></span>
                                    {t("Cast & Crew")}
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-6">
                                    {series.persons
                                        ?.slice(0, 8)
                                        .map((actor) => (
                                            <Link
                                                key={actor.id}
                                                href={route(
                                                    "person.show",
                                                    actor.person?.id
                                                )}
                                                className="group block"
                                            >
                                                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-200 dark:bg-gray-800">
                                                    <img
                                                        src={
                                                            actor.person
                                                                ?.avatar_url ||
                                                            "/images/placeholder-avatar.jpg"
                                                        }
                                                        alt={actor.person?.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <h4 className="text-gray-900 dark:text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                                                    {actor.person?.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {actor.character_name
                                                        ? actor.character_name
                                                        : actor.role_type}
                                                </p>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            <div className="w-full">
                                <h1>{t("Backdrop")}</h1>
                                <img
                                    className="w-full rounded-lg mt-8"
                                    src={series.banner_url}
                                    alt={`${series.title} Backdrop`}
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-80 flex-shrink-0 space-y-12">
                            <div className="glass-card-adaptive p-6">
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center">
                                    {t("Rate this Series")}
                                </h3>
                                {auth.user ? (
                                    <RatingWidget
                                        ratingAverage={
                                            series.rating_average || 0
                                        }
                                        ratingCount={series.rating_count || 0}
                                        userRating={userRating}
                                        onRate={handleRate}
                                    />
                                ) : (
                                    <div className="text-center text-sm text-gray-500">
                                        <a
                                            href={route("login")}
                                            className="text-blue-400 hover:underline"
                                        >
                                            {t("Log in")}
                                        </a>{" "}
                                        {t("to rate.")}
                                    </div>
                                )}
                            </div>

                            {relatedSeries && relatedSeries.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-l-4 border-blue-500 pl-3">
                                        {t("You May Also Like")}
                                    </h3>
                                    <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
                                        {relatedSeries
                                            .slice(0, 6)
                                            .map((rel) => (
                                                <a
                                                    href={route(
                                                        "series.show",
                                                        rel.slug
                                                    )}
                                                    key={rel.id}
                                                    className="group block"
                                                >
                                                    <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 relative">
                                                        <img
                                                            src={rel.poster_url}
                                                            alt={rel.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                    </div>
                                                    <h4 className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                                                        {rel.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span>
                                                            {
                                                                rel.release_year_start
                                                            }
                                                        </span>
                                                        <span className="text-yellow-500">
                                                            ★{" "}
                                                            {rel.rating_average}
                                                        </span>
                                                    </div>
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-16">
                            <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-[2px] bg-blue-500"></span>
                                {t("Reviews")}
                            </h3>
                            {auth.user && !userHasReviewed && (
                                <ReviewForm
                                    content={series}
                                    contentType="series"
                                    onSuccess={handleReviewSubmit}
                                />
                            )}
                            {auth.user &&
                                userHasReviewed &&
                                !editingReviewId && (
                                    <div className="glass-card-adaptive p-6 text-center">
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                                            You have already reviewed this
                                            series.
                                        </p>
                                    </div>
                                )}
                            {!auth.user && (
                                <div className="glass-card-adaptive p-8 text-center">
                                    <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
                                        {t("Please log in to write a review.")}
                                    </p>
                                    <a
                                        href={route("login")}
                                        className="btn-primary inline-flex"
                                    >
                                        {t("Log In to Review")}
                                    </a>
                                </div>
                            )}
                            <div className="mt-8 space-y-4">
                                {series.reviews.length > 0 ? (
                                    series.reviews.map((review) =>
                                        editingReviewId === review.id ? (
                                            <ReviewForm
                                                key={`editing-${review.id}`}
                                                content={series}
                                                contentType="series"
                                                review={review}
                                                onSuccess={handleReviewSubmit}
                                                onCancel={() =>
                                                    setEditingReviewId(null)
                                                }
                                            />
                                        ) : (
                                            <Review
                                                key={review.id}
                                                review={review}
                                                onEdit={() =>
                                                    setEditingReviewId(
                                                        review.id
                                                    )
                                                }
                                                onDelete={() =>
                                                    handleReviewDelete(
                                                        review.id
                                                    )
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="text-gray-500 italic text-center py-8">
                                        {t("No reviews yet.")}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {showTrailer && (
                <TrailerModal
                    url={series.trailer_url}
                    onClose={() => setShowTrailer(false)}
                />
            )}
        </>
    );
}
