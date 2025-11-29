import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { footerData } = usePage().props;

    return (
        <footer className="border-t border-white/10 py-12 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-serif font-bold tracking-tighter mb-4">
                            CINE<span className="text-gray-600">VERSE</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                            Your ultimate destination for movies and series.
                        </p>
                        <div className="text-xs text-gray-600 uppercase tracking-widest">
                            © 2025 Cineverse. All rights reserved.
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Categories</h3>
                        <ul className="space-y-2">
                            {footerData?.categories?.map(category => (
                                <li key={category.id}>
                                    <Link
                                        href={route('movies.index', { genre: category.slug })}
                                        className="text-gray-400 hover:text-white transition-colors flex justify-between text-sm group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                                        <span className="text-gray-600 text-xs bg-white/5 px-2 py-0.5 rounded-full">{category.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actors */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Top Actors</h3>
                        <ul className="space-y-2">
                            {footerData?.actors?.map(actor => (
                                <li key={actor.id}>
                                    <Link
                                        href={route('movies.index', { actor: actor.id })}
                                        className="text-gray-400 hover:text-white transition-colors flex justify-between text-sm group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{actor.name}</span>
                                        <span className="text-gray-600 text-xs bg-white/5 px-2 py-0.5 rounded-full">{actor.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
