import React from "react";
import { Link } from "@inertiajs/react";

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const StarIcon = ({ className = "w-3 h-3" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

export default function MediaCard({ item, type }) {
    console.log(item);
    const href =
        type === "movie"
            ? route("movies.show", item.slug)
            : route("series.show", item.slug);

    const year =
        item.release_year ||
        item.release_year_start ||
        (item.release_date
            ? new Date(item.release_date).getFullYear()
            : null) ||
        (item.created_at ? new Date(item.created_at).getFullYear() : "N/A");

    const duration =
        type === "movie" && item.runtime ? `${item.runtime} min` : null;
    const seasons =
        type === "series" && item.seasons_count
            ? `${item.seasons_count} Seasons`
            : null;

    return (
        <Link href={href} className="group block relative w-full">
            {/* Poster Container */}
            <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-900 mb-3 relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                    src={item.poster_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                {/* VIP Badge */}
                {item.is_vip_only && (
                    <div className="absolute top-1 left-1 px-1 md:top-3 md:left-3 md:px-3 py-0.5 bg-yellow-500 text-black text-[10px]  md:text-sm font-black uppercase tracking-wider rounded-sm shadow-md z-10">
                        VIP
                    </div>
                )}

                {/* Rating Badge */}
                {item.rating_average > 0 && (
                    <div className="absolute top-1 right-1 md:top-3 md:right-3 flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-xs md:text-sm  font-bold text-yellow-400 z-10">
                        <StarIcon />
                        <span>{Number(item.rating_average).toFixed(1)}</span>
                    </div>
                )}

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl group-hover:bg-indigo-600/90 group-hover:border-indigo-500 transition-colors">
                        <PlayIcon className="w-6 h-6 text-white ml-1" />
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="space-y-1">
                <h3 className="text-gray-800 dark:text-white font-medium text-base leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium flex-wrap">
                    <span className="text-gray-700 dark:text-gray-300">{year}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                    <span
                        className={`uppercase tracking-wide text-[10px] border dark:border-gray-700 px-1 rounded text-gray-600 dark:text-gray-400 ${
                            item.status === "ongoing"
                                ? "bg-green-100 dark:bg-green-500/20"
                                : "bg-red-100 dark:bg-red-800/20"
                        }`}
                    >
                        {item.status}
                    </span>
                    {(duration || seasons) && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                            <span>{duration || seasons}</span>
                        </>
                    )}
                </div>

                {/* Genres (Optional - check if exists) */}
                {item.genres && item.genres.length > 0 && (
                    <div className="text-xs text-gray-500 truncate">
                        {item.genres.map((g) => g.name).join(", ")}
                    </div>
                )}
            </div>
        </Link>
    );
}
