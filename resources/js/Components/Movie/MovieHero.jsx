import React, { useState } from "react";

export default function MovieHero({ movie }) {
    const [showTrailer, setShowTrailer] = useState(false);

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const videoId = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        )?.[1];
        return videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
            : null;
    };

    const embedUrl = getYouTubeEmbedUrl(movie.trailer_url);

    return (
        <div className="relative w-full min-h-[85vh] flex items-end overflow-hidden group">
            {/* Background Image with Parallax-like effect */}
            <div className="absolute inset-0 z-0">
                <img
                    src={
                        movie.banner_url ||
                        movie.poster_url ||
                        "/images/placeholder-banner.jpg"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[20s] ease-out"
                />
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[#0a0e17]/30 z-10 mix-blend-multiply"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 mt-20 md:mt-0 container-custom w-full pb-16 md:pb-24">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-end animate-slide-up">
                    {/* Poster Card */}
                    <div className="hidden md:block flex-shrink-0 w-64 lg:w-72 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 transform hover:-translate-y-2 transition-transform duration-500">
                        <img
                            src={
                                movie.poster_url ||
                                "/images/placeholder-poster.jpg"
                            }
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 space-y-6 md:space-y-8">
                        {/* Title */}
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                                {movie.title}
                            </h1>
                            {movie.original_title &&
                                movie.original_title !== movie.title && (
                                    <p className="text-xl md:text-2xl text-gray-400 font-light italic">
                                        {movie.original_title}
                                    </p>
                                )}
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 transition-all duration-300 cursor-default backdrop-blur-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-4 font-light drop-shadow-md">
                            {movie.description}
                        </p>
                        {/* Badges & Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                            {movie.is_vip_only && (
                                <span className="badge-vip px-4 py-1.5 text-sm shadow-lg shadow-yellow-500/20 animate-pulse">
                                    VIP EXCLUSIVE
                                </span>
                            )}
                            {movie.release_date && (
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-gray-200">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                            )}
                            {movie.formatted_runtime && (
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-gray-200">
                                    {movie.formatted_runtime}
                                </span>
                            )}
                            {movie.age_rating && (
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-gray-200">
                                    {movie.age_rating}
                                </span>
                            )}
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-yellow-500/30 text-yellow-400">
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-bold">
                                    {movie.rating_average}
                                </span>
                                <span className="text-gray-400 text-xs">
                                    ({movie.rating_count})
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            {embedUrl && (
                                <button
                                    onClick={() => setShowTrailer(true)}
                                    className="btn-primary group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <svg
                                        className="w-5 h-5 mr-2 relative z-10"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                    </svg>
                                    <span className="relative z-10">
                                        Watch Trailer
                                    </span>
                                </button>
                            )}
                            <button className="btn-secondary group">
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Watchlist
                            </button>
                            <button className="btn-outline group">
                                <svg
                                    className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && embedUrl && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4"
                    onClick={() => setShowTrailer(false)}
                >
                    <div
                        className="relative w-full max-w-6xl mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 ring-1 ring-white/10">
                            <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
