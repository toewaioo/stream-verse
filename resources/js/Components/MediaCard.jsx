import React from "react";
import { Link } from "@inertiajs/react";

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export default function MediaCard({ item, type }) {
    const href =
        type === "movie"
            ? route("movies.show", item.slug)
            : route("series.show", item.slug);

    return (
        <Link href={href} className="group block relative">
            <div className="aspect-[2/3] overflow-hidden rounded-sm bg-gray-900 mb-3 relative">
                <img
                    src={item.poster_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <PlayIcon className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Rating Badge */}
                {item.rating_average > 0 && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white">
                        {item.rating_average}
                    </div>
                )}
            </div>

            <h3 className="text-white font-serif text-lg leading-tight group-hover:underline decoration-white/30 underline-offset-4 truncate">
                {item.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 font-mono">
                <span>
                    {item.release_year ||
                        new Date(item.created_at).getFullYear()}
                </span>
                <span>•</span>
                <span>{type === "movie" ? "Movie" : "Series"}</span>
            </div>
        </Link>
    );
}
