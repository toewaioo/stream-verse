import React from "react";
import { Head, Link } from "@inertiajs/react";

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">{subtitle}</p>}
        </div>
        <Link href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">View All</Link>
    </div>
);

const MediaCard = ({ item, type }) => {
    const href = type === 'movie' ? route('movies.show', item.slug) : route('series.show', item.slug);

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

            <h3 className="text-white font-serif text-lg leading-tight group-hover:underline decoration-white/30 underline-offset-4 truncate">{item.title}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 font-mono">
                <span>{item.release_year || new Date(item.created_at).getFullYear()}</span>
                <span>•</span>
                <span>{type === 'movie' ? 'Movie' : 'Series'}</span>
            </div>
        </Link>
    );
};

export default function Home({ featured, latestMovies, latestSeries }) {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">

                {/* --- HERO SECTION --- */}
                {featured && (
                    <div className="relative h-[85vh] w-full overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                src={featured.banner_url || featured.poster_url}
                                alt={featured.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
                        </div>

                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-6 md:px-12">
                                <div className="max-w-2xl">
                                    <span className="inline-block px-2 py-1 border border-white/30 text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6 backdrop-blur-sm">
                                        Featured {featured.seasons ? 'Series' : 'Film'}
                                    </span>
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-6">
                                        {featured.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-300 font-serif leading-relaxed mb-8 line-clamp-3 max-w-xl">
                                        {featured.description}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={featured.seasons ? route('series.show', featured.slug) : route('movies.show', featured.slug)}
                                            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                                        >
                                            Watch Now
                                        </Link>
                                        <button className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors backdrop-blur-sm">
                                            + My List
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CONTENT SECTIONS --- */}
                <div className="container mx-auto px-6 md:px-12 py-20 space-y-24">

                    {/* Latest Movies */}
                    <section>
                        <SectionTitle title="New Releases" subtitle="Fresh from the cinema" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                            {latestMovies.map(movie => (
                                <MediaCard key={movie.id} item={movie} type="movie" />
                            ))}
                        </div>
                    </section>

                    {/* Latest Series */}
                    <section>
                        <SectionTitle title="Latest Series" subtitle="Binge-worthy collections" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                            {latestSeries.map(series => (
                                <MediaCard key={series.id} item={series} type="series" />
                            ))}
                        </div>
                    </section>

                </div>

                {/* --- FOOTER --- */}
                <footer className="border-t border-white/10 py-12 bg-black">
                    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-2xl font-serif font-bold tracking-tighter">
                            CINE<span className="text-gray-600">VERSE</span>
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-widest">
                            © 2025 Cineverse. All rights reserved.
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
