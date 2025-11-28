import React from 'react';
import { Link } from '@inertiajs/react';

export default function RelatedMovies({ movies }) {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="section-spacing">
            <div className="container-custom">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    More Like This
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movies/${movie.slug}`}
                            className="movie-card group"
                        >
                            <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-3">
                                <img
                                    src={movie.poster_url || '/images/placeholder-poster.jpg'}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {movie.is_vip_only && (
                                    <div className="absolute top-2 right-2">
                                        <span className="badge-vip text-xs">VIP</span>
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold">{movie.rating_average}</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-semibold text-white line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
                                {movie.title}
                            </h3>
                            <p className="text-xs text-gray-400">
                                {movie.release_year || new Date(movie.release_date).getFullYear()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
