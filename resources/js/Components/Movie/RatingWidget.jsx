import React, { useState } from "react";

export default function RatingWidget({
    ratingAverage,
    ratingCount,
    userRating,
    onRate,
}) {
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedRating, setSelectedRating] = useState(
        userRating?.rating || 0
    );

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
        if (onRate) {
            onRate(rating);
        }
    };

    const renderStars = (rating, interactive = false) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            // Backend is 1-10, Frontend is 1-5 stars
            // If rating is 7.5 (backend), that's 3.75 stars.
            // For display (non-interactive), we want to fill stars up to rating/2.
            // For interactive, we check against hoveredStar (1-5) or selectedRating/2.

            let isFilled;
            if (interactive) {
                // hoveredStar is 1-5
                // selectedRating is 1-10
                const currentDisplayRating = hoveredStar > 0 ? hoveredStar : (selectedRating / 2);
                isFilled = starValue <= Math.ceil(currentDisplayRating);
            } else {
                isFilled = starValue <= Math.round(rating / 2);
            }

            return (
                <svg
                    key={index}
                    className={`star dark:text-yellow-400 ${isFilled ? "filled" : ""}`}
                    onMouseEnter={() =>
                        interactive && setHoveredStar(starValue)
                    }
                    onMouseLeave={() => interactive && setHoveredStar(0)}
                    onClick={() => interactive && handleStarClick(starValue * 2)}
                    fill={isFilled ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
            );
        });
    };

    return (
        <div className="space-y-4 w-full">
            {/* Average Rating Display */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 w-full">
                <div className="flex flex-col items-center sm:items-end sm:flex-row gap-2 w-full">
                    <div className="text-4xl sm:text-5xl font-bold gradient-text text-center sm:text-right w-full sm:w-auto">
                        {ratingAverage.toFixed(1)}
                    </div>
                    <div className="star-rating flex flex-row items-center justify-center sm:justify-start mt-2 sm:mt-0">
                        {renderStars(ratingAverage)}
                    </div>
                    <div className="text-xs sm:text-sm dark:text-gray-400 mt-1 text-center sm:text-left w-full sm:w-auto">
                        {ratingCount.toLocaleString()}{" "}
                        {ratingCount === 1 ? "rating" : "ratings"}
                    </div>
                </div>
            </div>

            {/* User Rating Input */}
            {onRate && (
                <div className="glass-card-dark p-4 rounded-lg flex flex-col items-center w-full">
                    <h4 className="text-sm font-medium dark:text-gray-300 mb-2 text-center w-full">
                        Rate this movie
                    </h4>
                    <div className="star-rating flex flex-row items-center justify-center w-full">
                        {renderStars(selectedRating, true)}
                    </div>
                    {selectedRating > 0 && (
                        <p className="text-xs dark:text-gray-400 mt-2 text-center w-full">
                            You rated this {selectedRating / 2}{" "}
                            {selectedRating / 2 === 1 ? "star" : "stars"}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
