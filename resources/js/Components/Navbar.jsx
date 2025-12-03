import React, { useState, useEffect } from "react";
import { Link, useForm, router, usePage } from "@inertiajs/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();
    const { data, setData } = useForm({
        q: "",
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("search"),
            { q: data.q },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-white/80 dark:bg-black/90 backdrop-blur-md pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] shadow-lg"
                        : "bg-transparent pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] md:pb-6 md:pt-[calc(1.5rem+env(safe-area-inset-top))]"
                    }`}
            >
                <div className="container mx-auto px-2 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={route("home")}
                        className="text-2xl font-serif font-bold tracking-tighter text-gray-800 dark:text-white z-50"
                    >
                        CINE<span className="text-gray-500 dark:text-gray-400">VERSE</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href={route("home")}
                            className="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {t("Home")}
                        </Link>
                        <Link
                            href={route("movies.index")}
                            className="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {t("Movies")}
                        </Link>
                        <Link
                            href={route("series.index")}
                            className="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {t("Series")}
                        </Link>
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Search */}
                        <div
                            className={`hidden md:flex relative items-center transition-all duration-300 ${isSearchOpen ? "w-64" : "w-8"
                                }`}
                        >
                            <form onSubmit={handleSearch} className="w-full">
                                <input
                                    type="text"
                                    value={data.q}
                                    onChange={(e) =>
                                        setData("q", e.target.value)
                                    }
                                    placeholder={t("Search titles...")}
                                    className={`w-full p-5 bg-transparent border-b border-gray-800/30 dark:border-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-800 dark:focus:border-white py-1 pl-8 pr-2 transition-all duration-300 ${isSearchOpen
                                        ? "opacity-100 visible"
                                        : "opacity-0 invisible w-0"
                                        }`}
                                    onBlur={() =>
                                        !data.q && setIsSearchOpen(false)
                                    }
                                />
                            </form>
                            <button
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen);
                                    if (!isSearchOpen) {
                                        setTimeout(
                                            () =>
                                                document
                                                    .querySelector(
                                                        'input[name="q"]'
                                                    )
                                                    ?.focus(),
                                            100
                                        );
                                    }
                                }}
                                className="absolute left-0 p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6 "
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex md:hidden">
                            <form
                                onSubmit={handleSearch}
                                className="w-full ml-3"
                            >
                                <input
                                    type="text"
                                    value={data.q}
                                    onChange={(e) =>
                                        setData("q", e.target.value)
                                    }
                                    placeholder={t("Search titles...")}
                                    className={`w-full p-5 bg-transparent border-b border-gray-800/30 dark:border-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-800 dark:focus:border-white py-1 pr-2 transition-all duration-300 ${isSearchOpen
                                        ? "opacity-100 visible"
                                        : "opacity-0 invisible w-0"
                                        }`}
                                    onBlur={() =>
                                        !data.q && setIsSearchOpen(false)
                                    }
                                />
                            </form>
                            <button
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen);
                                    if (!isSearchOpen) {
                                        setTimeout(
                                            () =>
                                                document
                                                    .querySelector(
                                                        'input[name="q"]'
                                                    )
                                                    ?.focus(),
                                            100
                                        );
                                    }
                                }}
                                className={`${isSearchOpen ? "hidden" : ""} ${isMobileMenuOpen ? "hidden" : ""
                                    } left-0 p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors`}
                            >
                                <svg
                                    className="w-6 h-6 "
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="md:hidden text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-50"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
                onClick={closeMobileMenu}
            />

            {/* Mobile Menu Slide-out */}
            <div
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-black z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full pt-24 px-6 pb-6">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={data.q}
                                onChange={(e) => setData("q", e.target.value)}
                                placeholder={t("Search titles...")}
                                className="w-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-800 dark:focus:border-white py-3 pl-4 pr-12 transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col space-y-1">
                        <Link
                            href={route("home")}
                            onClick={closeMobileMenu}
                            className="text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all py-4 px-4 rounded-lg"
                        >
                            {t("Home")}
                        </Link>
                        <Link
                            href={route("movies.index")}
                            onClick={closeMobileMenu}
                            className="text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all py-4 px-4 rounded-lg"
                        >
                            {t("Movies")}
                        </Link>
                        <Link
                            href={route("series.index")}
                            onClick={closeMobileMenu}
                            className="text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all py-4 px-4 rounded-lg"
                        >
                            {t("Series")}
                        </Link>
                        <div className="flex items-center gap-4 mt-4 px-2">
                            <LanguageSwitcher />
                            <ThemeSwitcher />
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                            CINE<span className="text-gray-600">VERSE</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 md:hidden pb-safe">
                <div className="flex items-center justify-around p-4">
                    <Link
                        href={route("home")}
                        className={`flex flex-col items-center gap-1 ${route().current("home")
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="text-[10px] uppercase tracking-wider font-medium">
                            {t("Home")}
                        </span>
                    </Link>

                    <Link
                        href={route("movies.index")}
                        className={`flex flex-col items-center gap-1 ${route().current("movies.*")
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                            />
                        </svg>
                        <span className="text-[10px] uppercase tracking-wider font-medium">
                            {t("Movies")}
                        </span>
                    </Link>

                    <Link
                        href={route("series.index")}
                        className={`flex flex-col items-center gap-1 ${route().current("series.*")
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-[10px] uppercase tracking-wider font-medium">
                            {t("Series")}
                        </span>
                    </Link>

                    <Link
                        href={
                            usePage().props.auth.user
                                ? route("profile.edit")
                                : route("login")
                        }
                        className={`flex flex-col items-center gap-1 ${route().current("profile.*") ||
                            route().current("login")
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span className="text-[10px] uppercase tracking-wider font-medium">
                            {t("Profile")}
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
}
