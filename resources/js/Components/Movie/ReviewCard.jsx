import React from 'react';

export default function ReviewCard({ review }) {
    const [showFullContent, setShowFullContent] = React.useState(false);
    const [showSpoiler, setShowSpoiler] = React.useState(false);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-600'} drop-shadow-sm`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ));
    };

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

    const shouldTruncate = review.content && review.content.length > 300;
    const displayContent = shouldTruncate && !showFullContent
        ? review.content.substring(0, 300) + '...'
        : review.content;

    return (
        <div className="glass-card-dark p-6 hover:bg-white/5 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 border border-white/10">
                        {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">{review.user?.name || 'Anonymous'}</h4>
                        <p className="text-xs text-gray-400 font-medium">{formatDate(review.created_at)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                    {renderStars(review.rating)}
                </div>
            </div>

            {/* Title */}
            {review.title && (
                <h3 className="text-xl font-bold text-white mb-3">{review.title}</h3>
            )}

            {/* Spoiler Warning */}
            {review.contains_spoilers && !showSpoiler && (
                <div className="mb-4 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-400">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-yellow-400 font-bold text-lg mb-1">Contains Spoilers</h4>
                            <p className="text-yellow-400/70 text-sm mb-4">This review contains spoilers for the movie.</p>
                            <button
                                onClick={() => setShowSpoiler(true)}
                                className="px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-semibold transition-colors border border-yellow-500/30"
                            >
                                Reveal Review
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {(!review.contains_spoilers || showSpoiler) && (
                <div className="text-gray-300 leading-relaxed text-base">
                    <p className="whitespace-pre-line">{displayContent}</p>
                    {shouldTruncate && (
                        <button
                            onClick={() => setShowFullContent(!showFullContent)}
                            className="text-blue-400 hover:text-blue-300 text-sm mt-3 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            {showFullContent ? 'Show less' : 'Read more'}
                            <svg className={`w-4 h-4 transition-transform ${showFullContent ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
                <button className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium">Helpful</span>
                </button>
                <button className="group flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-red-500/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium">Report</span>
                </button>
            </div>
        </div>
    );
}
