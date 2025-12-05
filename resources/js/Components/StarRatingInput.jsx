import React, { useState } from "react";

export default function StarRatingInput({ value, onChange, error }) {
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleStarClick = (rating) => {
        if (onChange) {
            onChange(rating);
        }
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            // value is 1-10, so we divide by 2 for 5 stars
            const currentRating = hoveredStar > 0 ? hoveredStar : (value / 2);
            const isFilled = starValue <= Math.ceil(currentRating);

            return (
                <button
                    key={index}
                    type="button"
                    className={`star transition-transform hover:scale-110 focus:outline-none ${isFilled ? "text-yellow-500 dark:text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    onMouseEnter={() => setHoveredStar(starValue)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleStarClick(starValue * 2)}
                >
                    <svg
                        className="w-8 h-8"
                        fill={isFilled ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
                </button>
            );
        });
    };

    return (
        <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-1">
                {renderStars()}
            </div>
            {value > 0 && (
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    {value} / 10
                </span>
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
}
