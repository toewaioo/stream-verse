import React, { useEffect, useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import RatingWidget from "@/Components/Movie/RatingWidget";
import Review from "@/Components/Movie/Review";
import ReviewForm from "@/Components/Movie/ReviewForm";
import SeoHead from "@/Components/SeoHead";
import Footer from "@/Components/Footer";
import { useTranslation } from "react-i18next";

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
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={`group flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-2 ${
                isLocked ? "opacity-50" : ""
            }`}
        >
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="dark:text-white font-serif text-lg leading-none">
                        {link.server_name}
                    </span>
                    {/* <span className="text-gray-500 text-xs font-mono mt-1">
                        {link.url}
                    </span> */}
                </div>
            </div>
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    type === "download"
                        ? "border-blue-500 text-blue-500"
                        : "border-red-500 text-red-500"
                }`}
            >
                {link.quality?.replace("p", "") || "HD"}
            </div>

            <div className="flex items-center gap-3">
                {isLocked ? (
                    <span className="text-xs font-bold text-yellow-500 border border-yellow-500 px-2 py-1 uppercase tracking-widest">
                        {t("VIP")}
                    </span>
                ) : (
                    <>
                        {/* <button
                            onClick={handleCopy}
                            className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
                        >
                            {copied ? t("Copied") : t("Copy")}
                        </button> */}
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                type === "download"
                                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                                    : "bg-red-600 hover:bg-red-500 text-white"
                            }`}
                        >
                            <svg
                                className="w-4 h-4"
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
                    </>
                )}
            </div>
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

export default function MovieDetails({
    movie,
    watchLinksByQuality,
    downloadLinksByQuality,
    relatedMovies,
    userRating,
    isVip,
    seo,
}) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [showTrailer, setShowTrailer] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.BackButton.show();

        tg.onEvent("backButtonClicked", () => {
            const prevRoute =
                sessionStorage.getItem("tgPrevRoute") || route("home");
            router.visit(prevRoute, {
                preserveState: true,
                preserveScroll: true,
            });
        });
        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick();
        };
    }, []);

    const scrollToWatch = () => {
        document
            .getElementById("watch-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const userHasReviewed = movie.reviews.some(
        (review) => review.user_id === auth.user?.id
    );

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
                {/* --- HERO SECTION --- */}
                <div className="relative w-full min-h-[85vh] md:min-h-[100vh] flex items-end pb-12 md:pb-24 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={movie.banner_url}
                            alt={movie.title}
                            className={`hidden md:block w-full h-full object-cover`}
                        />
                        <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className={`block md:hidden w-full h-full object-cover`}
                        />
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0a0e17] via-gray-50/60 dark:via-[#0a0e17]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-[#0a0e17] via-gray-50/40 dark:via-[#0a0e17]/40 to-transparent" />
                        <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 container-custom w-full">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end">
                            {/* Poster Card (Floating) */}
                            <div className="hidden md:block w-64 lg:w-72 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 transform hover:scale-105 transition-transform duration-500">
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 w-full text-center md:text-left">
                                <div
                                    className="mb-4 animate-slide-up"
                                    style={{ animationDelay: "0.1s" }}
                                >
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-2 font-serif leading-tight drop-shadow-lg">
                                        {movie.title}
                                    </h1>
                                    {movie.original_title && (
                                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-serif italic">
                                            {movie.original_title}
                                        </p>
                                    )}
                                </div>

                                {/* Metadata Row */}
                                <div
                                    className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mb-8 text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 animate-slide-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    {movie.rating_average > 0 && (
                                        <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                                            <span>★</span>
                                            <span className="text-gray-900 dark:text-white">
                                                {movie.rating_average}
                                            </span>
                                        </div>
                                    )}

                                    <span>
                                        {new Date(
                                            movie.release_date
                                        ).getFullYear()}
                                    </span>

                                    <span className="px-2 py-0.5 border border-gray-300 dark:border-white/20 rounded text-xs uppercase tracking-wider bg-gray-200 dark:bg-white/5">
                                        {movie.age_rating || "PG-13"}
                                    </span>

                                    <span>{movie.formatted_runtime}</span>

                                    {movie.country && (
                                        <>
                                            <span className="hidden md:inline">
                                                •
                                            </span>
                                            <span>{movie.country}</span>
                                        </>
                                    )}

                                    {movie.view_count > 0 && (
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
                                            <span>{movie.view_count}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Genres */}
                                <div
                                    className="flex flex-wrap justify-center md:justify-start gap-2 mb-8 animate-slide-up"
                                    style={{ animationDelay: "0.3s" }}
                                >
                                    {movie.genres?.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="genre-pill"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div
                                    className="flex flex-wrap justify-center md:justify-start gap-4 animate-slide-up"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    <button
                                        onClick={scrollToWatch}
                                        className="btn-primary group"
                                    >
                                        <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        {t("Watch Now")}
                                    </button>

                                    {movie.trailer_url && (
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

                {/* --- MAIN CONTENT --- */}
                <div className="container-custom py-12 md:py-20">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Column: Synopsis, Links, Cast */}
                        <div className="flex-1">
                            {/* Synopsis */}
                            <div className="mb-16">
                                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-[2px] bg-blue-500"></span>
                                    {t("Synopsis")}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed opacity-90">
                                    {movie.description}
                                </p>
                            </div>

                            {/* Links Section */}
                            <div
                                id="watch-section"
                                className="mb-16 scroll-mt-24"
                            >
                                <div className="glass-card-adaptive p-6 md:p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-serif text-gray-900 dark:text-white flex items-center gap-3">
                                            <PlayIcon className="w-6 h-6 text-blue-500" />
                                            {t("Watch & Download")}
                                        </h3>
                                        {movie.is_vip_only && (
                                            <span className="badge-vip">
                                                {t("VIP ACCESS")}
                                            </span>
                                        )}
                                    </div>

                                    {auth.user ? (
                                        <div className="space-y-8">
                                            {/* Watch Links */}
                                            <div
                                                className={`${
                                                    watchLinksByQuality &&
                                                    Object.keys(
                                                        watchLinksByQuality
                                                    ).length > 0
                                                        ? ""
                                                        : "hidden"
                                                }`}
                                            >
                                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                                                    {t("Streaming Sources")}
                                                </h4>
                                                <div className="grid gap-2">
                                                    {watchLinksByQuality &&
                                                    Object.keys(
                                                        watchLinksByQuality
                                                    ).length > 0 ? (
                                                        Object.values(
                                                            watchLinksByQuality
                                                        )
                                                            .flat()
                                                            .map((link) => (
                                                                <LinkItem
                                                                    key={
                                                                        link.id
                                                                    }
                                                                    link={link}
                                                                    type="watch"
                                                                    isVip={
                                                                        isVip
                                                                    }
                                                                />
                                                            ))
                                                    ) : (
                                                        <div className="text-gray-500 italic">
                                                            {t(
                                                                "No streaming links available."
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Download Links */}
                                            <div
                                                className={`${
                                                    downloadLinksByQuality &&
                                                    Object.keys(
                                                        downloadLinksByQuality
                                                    ).length > 0
                                                        ? ""
                                                        : "hidden"
                                                }`}
                                            >
                                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                                                    {t("Download Files")}
                                                </h4>
                                                <div className="grid gap-2">
                                                    {downloadLinksByQuality &&
                                                    Object.keys(
                                                        downloadLinksByQuality
                                                    ).length > 0 ? (
                                                        Object.values(
                                                            downloadLinksByQuality
                                                        )
                                                            .flat()
                                                            .map((link) => (
                                                                <LinkItem
                                                                    key={
                                                                        link.id
                                                                    }
                                                                    link={link}
                                                                    type="download"
                                                                    isVip={
                                                                        isVip
                                                                    }
                                                                />
                                                            ))
                                                    ) : (
                                                        <div className="text-gray-500 italic">
                                                            {t(
                                                                "No download links available."
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-400 mb-6">
                                                {t(
                                                    "Please log in to access streaming and download links."
                                                )}
                                            </p>
                                            <a
                                                href={route("login")}
                                                className="btn-primary"
                                            >
                                                {t("Log In to Watch")}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cast */}
                            <div className="mb-16">
                                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-2 h-[2px] bg-blue-500"></span>
                                    {t("Cast & Crew")}
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-6">
                                    {movie.actors?.slice(0, 8).map((actor) => (
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
                                                {actor.character_name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* Reviews Section */}
                            <div className="mb-16">
                                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-2 h-[2px] bg-blue-500"></span>
                                    {t("Reviews")}
                                </h3>
                                {auth.user && !userHasReviewed && (
                                    <ReviewForm
                                        content={movie}
                                        contentType="movie"
                                        onSuccess={() => {
                                            // maybe show a toast or something
                                        }}
                                    />
                                )}
                                {auth.user &&
                                    userHasReviewed &&
                                    !editingReviewId && (
                                        <div className="glass-card-adaptive p-6 text-center">
                                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                                You have already reviewed this
                                                movie.
                                            </p>
                                        </div>
                                    )}
                                {!auth.user && (
                                    <div className="glass-card-adaptive p-8 text-center">
                                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
                                            {t(
                                                "Please log in to write a review."
                                            )}
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
                                    {movie.reviews.length > 0 ? (
                                        movie.reviews.map((review) =>
                                            editingReviewId === review.id ? (
                                                <ReviewForm
                                                    key={`editing-${review.id}`}
                                                    content={movie}
                                                    contentType="movie"
                                                    review={review}
                                                    onSuccess={() =>
                                                        setEditingReviewId(null)
                                                    }
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
                                                    onDelete={() => {
                                                        router.delete(
                                                            route(
                                                                "reviews.destroy",
                                                                review.id
                                                            ),
                                                            {
                                                                preserveScroll: true,
                                                            }
                                                        );
                                                    }}
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

                            {/*Backdrop*/}
                            <div className="w-full">
                                <h1>{t("Backdrop")}</h1>
                                <img
                                    className="w-full rounded-lg mt-8"
                                    src={movie.banner_url}
                                    alt={`${movie.title} Backdrop`}
                                />
                            </div>
                        </div>

                        {/* Right Column: Sidebar (Rating, Related) */}
                        <div className="w-full lg:w-80 flex-shrink-0 space-y-12">
                            {/* Rating Widget */}
                            <div className="glass-card-adaptive p-6">
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center">
                                    {t("Rate this Movie")}
                                </h3>
                                {auth.user ? (
                                    <RatingWidget
                                        ratingAverage={
                                            movie.rating_average || 0
                                        }
                                        ratingCount={movie.rating_count || 0}
                                        userRating={userRating}
                                        onRate={(rating) => {
                                            if (userRating) {
                                                router.put(
                                                    route(
                                                        "admin.ratings.update",
                                                        userRating.id
                                                    ),
                                                    { rating },
                                                    { preserveScroll: true }
                                                );
                                            } else {
                                                router.post(
                                                    route(
                                                        "admin.ratings.store"
                                                    ),
                                                    {
                                                        movie_id: movie.id,
                                                        rating,
                                                    },
                                                    { preserveScroll: true }
                                                );
                                            }
                                        }}
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

                            {/* Related Movies */}
                            {relatedMovies && relatedMovies.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-l-4 border-blue-500 pl-3">
                                        {t("You May Also Like")}
                                    </h3>
                                    <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
                                        {relatedMovies
                                            .slice(0, 6)
                                            .map((rel) => (
                                                <a
                                                    href={route(
                                                        "movies.show",
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
                                                            {new Date(
                                                                rel.release_date
                                                            ).getFullYear()}
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
                    </div>
                </div>

                <Footer />
            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <TrailerModal
                    url={movie.trailer_url}
                    onClose={() => setShowTrailer(false)}
                />
            )}
        </>
    );
}
