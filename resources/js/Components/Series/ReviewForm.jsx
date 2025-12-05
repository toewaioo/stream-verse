import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import StarRatingInput from "@/Components/StarRatingInput"; // Assuming this path

const ReviewForm = ({ series, onSuccess }) => {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        rating: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("reviews.store.series", series.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) {
                    onSuccess();
                }
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card-adaptive p-6 mb-8 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
                <img
                    src={auth.user.avatar_url || "/images/placeholder-avatar.jpg"}
                    alt={auth.user.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover hidden sm:block"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Write a review
                    </h3>
                    <div className="relative mb-4">
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 p-4 rounded-xl text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 resize-y min-h-[120px]"
                            placeholder={`What did you think of ${series.title}? Share your thoughts...`}
                        ></textarea>
                        {errors.content && <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {errors.content}
                        </p>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:w-auto">
                            <StarRatingInput
                                value={data.rating}
                                onChange={(rating) => setData("rating", rating)}
                                error={errors.rating}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary w-full sm:w-auto px-8 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : "Submit Review"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ReviewForm;

