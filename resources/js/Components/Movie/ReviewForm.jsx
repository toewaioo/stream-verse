import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import StarRatingInput from "@/Components/StarRatingInput";

const ReviewForm = ({
    content,
    review = null,
    onSuccess,
    onCancel,
}) => {
    const { auth } = usePage().props;
    const [formData, setFormData] = useState({
        content: review ? review.content : "",
        rating: review ? review.rating : 0,
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (review) {
            setFormData({
                content: review.content,
                rating: review.rating,
            });
        }
    }, [review]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await onSuccess({ id: review?.id, ...formData });
            if (!review) {
                setFormData({ content: "", rating: 0 });
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            console.error("Submission failed", error);
        } finally {
            setProcessing(false);
        }
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="glass-card-adaptive p-6 mb-8 transition-all duration-300 hover:shadow-lg"
        >
            <div className="flex items-start gap-4">
                <img
                    src={
                        auth.user.avatar_url ||
                        "/images/placeholder-avatar.jpg"
                    }
                    alt={auth.user.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover hidden sm:block"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        {review ? "Edit your review" : "Write a review"}
                    </h3>
                    <div className="relative mb-4">
                        <textarea
                            value={formData.content}
                            onChange={(e) => handleChange("content", e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 p-4 rounded-xl text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 resize-y min-h-[120px]"
                            placeholder={`What did you think of ${content.title}? Share your thoughts...`}
                        ></textarea>
                        {errors.content && (
                            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {errors.content[0]}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:w-auto">
                            <StarRatingInput
                                value={formData.rating}
                                onChange={(rating) => handleChange("rating", rating)}
                                error={errors.rating ? errors.rating[0] : null}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {review && (
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="btn-primary w-full sm:w-auto px-8 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : review ? (
                                    "Update Review"
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ReviewForm;

