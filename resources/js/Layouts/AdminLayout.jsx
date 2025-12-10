import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import DarkModeToggle from "@/Components/DarkModeToggle";
import {
    HomeIcon,
    FilmIcon,
    TvIcon,
    TagIcon,
    UserGroupIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    ArrowRightOnRectangleIcon,
    KeyIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = [
        { name: "Dashboard", href: route("admin.dashboard"), icon: HomeIcon },
        { name: "Movies", href: route("admin.movies"), icon: FilmIcon },
        { name: "Series", href: route("admin.series"), icon: TvIcon },
        { name: "Genres", href: route("admin.genres"), icon: TagIcon },
        { name: "Persons", href: route("admin.persons"), icon: UserGroupIcon },
        {
            name: "VIP Keys",
            href: route("admin.vip-keys.index"),
            icon: KeyIcon,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
            {/* Sidebar Backdrop (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 border-r border-gray-100 dark:border-gray-700/50`}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 dark:border-gray-700/50">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                            <ApplicationLogo className="h-6 w-auto fill-current text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            Admin<span className="text-indigo-600">Panel</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    <div className="mb-6 px-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Menu
                        </p>
                        <div className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = route().current(
                                    item.href.split(".").pop() === "dashboard"
                                        ? "admin.dashboard"
                                        : item.href.split("/").pop()
                                ) || window.location.href.includes(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 mr-3 transition-colors ${isActive
                                                ? "text-white"
                                                : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                                                }`}
                                        />
                                        {item.name}
                                        {isActive && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-l-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                {/* User Profile (Bottom Sidebar) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="md:ml-72 min-h-screen flex flex-col transition-all duration-300">
                {/* Top Header */}
                <header
                    className={`sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${scrolled ? "shadow-sm" : ""
                        }`}
                >
                    <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden transition-colors"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <DarkModeToggle />

                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none">
                                        <span className="hidden sm:block">Account</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content width="48" contentClasses="py-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
                                    </div>

                                    <Dropdown.Link href={route("profile.edit")} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <UserIcon className="w-4 h-4 mr-2" />
                                        Profile
                                    </Dropdown.Link>

                                    <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                                    >
                                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto animate-fade-in-up">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
