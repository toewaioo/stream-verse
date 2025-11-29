import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import SeoHead from "@/Components/SeoHead";
import MediaCard from "@/Components/MediaCard";

export default function Search({ results, query, seo }) {
    return (
        <>
            <SeoHead
                title={seo?.title}
                description={seo?.description}
            />
            <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
                <Navbar />

                <div className="container mx-auto px-6 md:px-12 py-32">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                            Search Results
                        </h1>
                        <p className="text-gray-400 text-lg">
                            {results.length > 0
                                ? `Found ${results.length} results for "${query}"`
                                : `No results found for "${query}"`
                            }
                        </p>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                            {results.map((item) => (
                                <MediaCard
                                    key={`${item.type}-${item.id}`}
                                    item={item}
                                    type={item.type}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-2">No matches found</h3>
                            <p className="text-gray-500 max-w-md">
                                We couldn't find any movies or series matching your search. Try checking for typos or using different keywords.
                            </p>
                            <Link
                                href={route('home')}
                                className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
