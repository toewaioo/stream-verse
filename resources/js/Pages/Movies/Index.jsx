import React from "react";
import { Head, Link } from "@inertiajs/react";
import MediaCard from "@/Components/MediaCard";
import Footer from "@/Components/Footer";

const Pagination = ({ links }) => {
    console.log(links);
    return (
        <div className="flex justify-center mt-12 gap-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ? link.url : "#"}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${link.active
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    disabled={!link.url}
                />
            ))}
        </div>
    );
};

export default function Index({ movies }) {
    console.log(movies);
    return (
        <>
            <Head title="Movies" />

            <div className="min-h-screen  bg-[#050505] text-white font-sans selection:bg-white selection:text-black pb-12">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-white">
                            Movies
                        </h1>
                        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
                            Browse all available films
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                        {movies.data.map((movie) => (
                            <MediaCard
                                key={movie.id}
                                item={movie}
                                type="movie"
                            />
                        ))}
                    </div>

                    {movies.links && movies.links.length > 3 && (
                        <Pagination links={movies.links} />
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
