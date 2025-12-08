import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {  Play, Clock, XCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";

export default function WatchHistory({ auth, history }) {
    const { delete: destroy, post, processing } = useForm();

    const handleRemove = (id) => {
        if (
            confirm("Are you sure you want to remove this from your history?")
        ) {
            destroy(route("watch-history.destroy", id));
        }
    };

    const handleClearAll = () => {
        if (
            confirm(
                "Are you sure you want to clear your entire watch history? This cannot be undone."
            )
        ) {
            post(route("watch-history.clear"));
        }
    };

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black">
            <Navbar/>
           
            <Head title="Watch History" />

            <div className="py-24">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Continue Watching
                        </h3>
                        {history.data.length > 0 && (
                            <button
                                onClick={handleClearAll}
                                disabled={processing}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear History
                            </button>
                        )}
                    </div> */}

                    {history.data.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                                No watch history yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Start watching movies and series to see them
                                here.
                            </p>
                            <Link
                                href={route("movies.index")}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Browse Movies
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {history.data.map((item) => {
                                const content =
                                    item.movie || item.series;
                                const title = item.movie
                                    ? item.movie.title
                                    : item.series?.title;
                                const subtitle = item.episode
                                    ? `S${item.episode.season_number} E${item.episode.episode_number} - ${item.episode.title}`
                                    : null;
                                const posterPath = item.movie
                                    ? item.movie.poster_url
                                    : item.series?.poster_url;
                                const link = item.movie
                                    ? route("movies.show", item.movie.slug)
                                    : item.episode?.series
                                    ? route(
                                          "series.show",
                                          item.series.slug
                                      )
                                    : "#";

                                if (!content) return null;

                                return (
                                    <div
                                        key={item.id}
                                        className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        {/* Poster Image */}
                                        <div className="aspect-[2/3] relative overflow-hidden bg-gray-900">
                                            <img
                                                src={posterPath}
                                                alt={title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                            />

                                            {/* Play Button Overlay */}
                                            <Link
                                                href={link}
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                    <Play className="w-6 h-6 text-white fill-current" />
                                                </div>
                                            </Link>

                                            {/* Progress Bar */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                                                <div
                                                    className="h-full bg-indigo-500"
                                                    style={{
                                                        width: `${item.percent_watched}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Content Info */}
                                        <div className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        href={link}
                                                        className="block truncate text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                    >
                                                        {title}
                                                    </Link>
                                                    {subtitle && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                                            {subtitle}
                                                        </p>
                                                    )}
                                                    {/* <div className="flex items-center mt-2 text-xs text-gray-400">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        <span>
                                                            {formatDuration(
                                                                item.last_position_seconds
                                                            )}{" "}
                                                            /{" "}
                                                            {formatDuration(
                                                                item.duration_seconds
                                                            )}
                                                        </span>
                                                        <span className="mx-2">
                                                            •
                                                        </span>
                                                        <span>
                                                            {Math.round(
                                                                item.percent_watched
                                                            )}
                                                            % complete
                                                        </span>
                                                    </div> */}
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handleRemove(item.id)
                                                    }
                                                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    title="Remove from history"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {history.links && history.links.length > 3 && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex gap-1">
                                {history.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        } ${
                                            !link.url &&
                                            "opacity-50 cursor-not-allowed"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
