import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import RatingWidget from "@/Components/Movie/RatingWidget";

// --- Components ---

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

const DownloadIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);

const LinkItem = ({ link, type, isVip }) => {
    const isLocked = link.is_vip_only && !isVip;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`group flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-2 ${isLocked ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${type === 'download' ? 'border-blue-500 text-blue-500' : 'border-red-500 text-red-500'}`}>
                    {link.quality?.replace('p', '') || 'HD'}
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-serif text-lg leading-none">{link.server_name}</span>
                    <span className="text-gray-500 text-xs font-mono mt-1">{link.url}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {isLocked ? (
                    <span className="text-xs font-bold text-yellow-500 border border-yellow-500 px-2 py-1 uppercase tracking-widest">VIP</span>
                ) : (
                    <>
                        <button
                            onClick={handleCopy}
                            className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
                        >
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${type === 'download' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white'}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

const TrailerModal = ({ url, onClose }) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;

    if (!embedUrl) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-fade-in" onClick={onClose}>
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl">
                <iframe src={embedUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
        </div>
    );
};

export default function MovieDetails({
    movie,
    watchLinksByQuality,
    downloadLinksByQuality,
    relatedMovies,
    userRating,
    isVip,
}) {
    const { auth } = usePage().props;
    const [showTrailer, setShowTrailer] = useState(false);

    return (
        <>
            <Head title={movie.title} />

            <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-white selection:text-black flex flex-col md:flex-row">

                {/* --- LEFT PANE: VISUAL (Fixed on Desktop) --- */}
                <div className="w-full md:w-1/2 lg:w-[45%] h-[60vh] md:h-screen relative md:sticky md:top-0 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent md:hidden"></div>
                    </div>

                    {/* Play Button (Centered) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={() => setShowTrailer(true)}
                            className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:scale-110 transition-all duration-500"
                        >
                            <div className="absolute inset-0 rounded-full border border-white/30 animate-ping-slow"></div>
                            <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black ml-1 transition-colors" />
                        </button>
                    </div>

                    {/* Mobile Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                        <h1 className="text-4xl font-serif font-bold text-white leading-none mb-2">{movie.title}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                            <span>•</span>
                            <span>{movie.formatted_runtime}</span>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANE: CONTENT (Scrollable) --- */}
                <div className="w-full md:w-1/2 lg:w-[55%] min-h-screen bg-[#080808] relative z-10">
                    <div className="p-6 md:p-12 lg:p-20 max-w-3xl mx-auto">

                        {/* Desktop Title */}
                        <div className="hidden md:block mb-12">
                            <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span>{movie.formatted_runtime}</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span className="text-white">{movie.rating_average?.toFixed(1)} Rating</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-[0.9] mb-6">
                                {movie.title}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres?.map(genre => (
                                    <span key={genre.id} className="px-3 py-1 border border-white/20 rounded-full text-xs text-gray-300 uppercase tracking-wider hover:border-white transition-colors cursor-default">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="mb-16">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Synopsis</h3>
                            <p className="text-lg md:text-xl text-gray-300 font-serif leading-relaxed">
                                {movie.description}
                            </p>
                        </div>

                        {/* Links Section */}
                        <div className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Watch & Download</h3>
                                {movie.is_vip_only && <span className="text-xs font-bold text-yellow-500 border border-yellow-500 px-2 py-0.5 rounded">VIP ACCESS</span>}
                            </div>

                            {auth.user ? (
                                <div className="space-y-8">
                                    {/* Watch */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-white">
                                            <PlayIcon className="w-5 h-5" />
                                            <span className="font-serif text-xl italic">Streaming Sources</span>
                                        </div>
                                        <div className="pl-4 border-l border-white/10">
                                            {watchLinksByQuality && Object.keys(watchLinksByQuality).length > 0 ? (
                                                Object.values(watchLinksByQuality).flat().map(link => (
                                                    <LinkItem key={link.id} link={link} type="watch" isVip={isVip} />
                                                ))
                                            ) : (
                                                <div className="text-gray-600 italic px-2">No streaming links available.</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Download */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-white">
                                            <DownloadIcon className="w-5 h-5" />
                                            <span className="font-serif text-xl italic">Download Files</span>
                                        </div>
                                        <div className="pl-4 border-l border-white/10">
                                            {downloadLinksByQuality && Object.keys(downloadLinksByQuality).length > 0 ? (
                                                Object.values(downloadLinksByQuality).flat().map(link => (
                                                    <LinkItem key={link.id} link={link} type="download" isVip={isVip} />
                                                ))
                                            ) : (
                                                <div className="text-gray-600 italic px-2">No download links available.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 border border-white/10 rounded-lg bg-white/5 text-center">
                                    <p className="text-gray-400 font-serif text-lg mb-4">Please log in to access streaming and download links.</p>
                                    <a href={route('login')} className="inline-block px-6 py-2 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                        Log In
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Cast */}
                        <div className="mb-16">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Cast & Crew</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
                                {movie.actors?.slice(0, 6).map(actor => (
                                    <div key={actor.id} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 grayscale hover:grayscale-0 transition-all">
                                            <img src={actor.person?.avatar_url || '/images/placeholder-avatar.jpg'} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-serif leading-none mb-1">{actor.person?.name}</span>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">{actor.character_name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rating & Related */}
                        <div className="pt-12 border-t border-white/10">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your Rating</h3>
                                    {auth.user ? (
                                        <RatingWidget
                                            ratingAverage={movie.rating_average || 0}
                                            ratingCount={movie.rating_count || 0}
                                            userRating={userRating}
                                            onRate={(rating) => console.log(rating)}
                                        />
                                    ) : (
                                        <div className="text-gray-500 text-sm italic">
                                            <a href={route('login')} className="text-white hover:underline">Log in</a> to rate this movie.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {relatedMovies && relatedMovies.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Related Films</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {relatedMovies.slice(0, 3).map(rel => (
                                            <a href={route('movies.show', rel.slug)} key={rel.id} className="group block">
                                                <div className="aspect-[3/2] overflow-hidden mb-2">
                                                    <img src={rel.poster_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                                                </div>
                                                <h4 className="text-white font-serif text-sm truncate group-hover:underline">{rel.title}</h4>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>

            {/* Trailer Modal */}
            {showTrailer && <TrailerModal url={movie.trailer_url} onClose={() => setShowTrailer(false)} />}
        </>
    );
}
