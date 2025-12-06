import React from "react";
import { usePage } from "@inertiajs/react";

const Review = ({ review, onEdit, onDelete }) => {
    const { auth } = usePage().props;
    const [showFullContent, setShowFullContent] = React.useState(false);
    const [showSpoiler, setShowSpoiler] = React.useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    const shouldTruncate = review?.content && review?.content.length > 300;
    const displayContent = shouldTruncate && !showFullContent
        ? review?.content.substring(0, 300) + '...'
        : review?.content;

    return (
        <div className="glass-card-adaptive p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={review?.user?.avatar_url || "/images/placeholder-avatar.jpg"}
                        alt={review?.user?.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover"
                    />
                    <div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">{review?.user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {formatDate(review?.created_at)}
                        </p>
                    </div>
                </div>
                {review?.rating && (
                    <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 bg-gray-100 dark:bg-black/20 px-3 py-1 rounded-full border border-gray-200 dark:border-white/5">
                        <span className="font-bold text-lg">★</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{review?.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">/10</span>
                    </div>
                )}
            </div>

            {/* Spoiler Warning */}
            {review?.contains_spoilers && !showSpoiler && (
                <div className="mb-4 p-6 bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-200 dark:border-yellow-500/20 rounded-xl backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-400">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-yellow-800 dark:text-yellow-400 font-bold text-lg mb-1">Contains Spoilers</h4>
                            <p className="text-yellow-700 dark:text-yellow-400/70 text-sm mb-4">This review contains spoilers.</p>
                            <button
                                onClick={() => setShowSpoiler(true)}
                                className="px-6 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 text-yellow-800 dark:text-yellow-400 rounded-lg font-semibold transition-colors border border-yellow-200 dark:border-yellow-500/30"
                            >
                                Reveal Review
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {(!review?.contains_spoilers || showSpoiler) && (
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    <p className="whitespace-pre-line">{displayContent}</p>
                    {shouldTruncate && (
                        <button
                            onClick={() => setShowFullContent(!showFullContent)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm mt-3 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            {showFullContent ? 'Show less' : 'Read more'}
                            <svg className={`w-4 h-4 transition-transform ${showFullContent ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {auth.user && auth.user.id === review?.user?.id && (
                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-white/5">
                    <button onClick={onEdit} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button onClick={onDelete} className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Review;

