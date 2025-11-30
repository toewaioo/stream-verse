import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { footerData } = usePage().props;

    return (
        <footer className="border-t border-white/10 py-12 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                            Categories
                        </h3>
                        <ul className="space-y-2">
                            {footerData?.categories?.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={route(
                                            "genre.show",
                                            category.slug
                                        )}
                                        className="text-gray-400 hover:text-white transition-colors flex justify-between text-sm group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {category.name}
                                        </span>
                                        <span className="text-gray-600 text-xs bg-white/5 px-2 py-0.5 rounded-full">
                                            {category.count}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actors */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                            Top Actors
                        </h3>
                        <ul className="space-y-2">
                            {footerData?.actors?.map((actor) => (
                                <li key={actor.id}>
                                    <Link
                                        href={route("person.show", actor.id)}
                                        className="text-gray-400 hover:text-white transition-colors flex justify-between text-sm group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {actor.name}
                                        </span>
                                        <span className="text-gray-600 text-xs bg-white/5 px-2 py-0.5 rounded-full">
                                            {actor.count}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={route("about")}
                                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        About Us
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("contact")}
                                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        Contact
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("faq")}
                                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        FAQ
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("privacy")}
                                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        Privacy Policy
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("terms")}
                                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        Terms of Service
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
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
                </div>
            </div>
        </footer>
    );
}
