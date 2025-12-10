import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import MovieForm from "./MovieForm";
import { debounce } from "lodash";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    StarIcon,
} from "@heroicons/react/24/outline";

export default function AdminMovies({ movies, genres, persons, auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const isFirst = useRef(true);

    const openCreateModal = () => {
        setEditingMovie(null);
        setIsModalOpen(true);
    };

    const openEditModal = (movie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMovie(null);
    };

    // Debounced search effect
    const debounceSearch = debounce((value) => {
        router.get(
            route("admin.movies"),
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["movies"],
                replace: true,
            }
        );
    }, 300);

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }
        debounceSearch(searchQuery);
    }, [searchQuery]);

    const handleDelete = (movie) => {
        if (confirm("Are you sure you want to delete this movie?")) {
            router.delete(route("admin.movies.destroy", movie.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Movies" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Movies
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage your movie catalog, details, and media.
                        </p>
                    </div>
                    <PrimaryButton onClick={openCreateModal} className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        Add Movie
                    </PrimaryButton>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <TextInput
                            type="text"
                            placeholder="Search movies by title..."
                            className="w-full pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* Add more filters here if needed */}
                </div>

                {/* Movies Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Movie
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Release Info
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Stats
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {movies.data.map((movie) => (
                                    <tr
                                        key={movie.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
                                                    {movie.poster_url ? (
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            src={movie.poster_url}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                            <FilmIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {movie.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {movie.original_title}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-300">
                                                {movie.release_date
                                                    ? new Date(movie.release_date).getFullYear()
                                                    : "N/A"}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {movie.runtime
                                                    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                                                    : "-"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span
                                                    className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${movie.status === "released"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                            : movie.status === "upcoming"
                                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                        }`}
                                                >
                                                    {movie.status}
                                                </span>
                                                {movie.is_vip_only && (
                                                    <span className="px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                                        VIP Only
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1.5" title="Rating">
                                                    <StarIcon className="w-4 h-4 text-amber-400" />
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {movie.rating_average || "0.0"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5" title="Views">
                                                    <EyeIcon className="w-4 h-4 text-gray-400" />
                                                    <span>
                                                        {movie.view_count?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(movie)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg dark:text-indigo-400 dark:hover:bg-indigo-900/20 transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                {auth.user.role === "admin" && (
                                                    <button
                                                        onClick={() => handleDelete(movie)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700/50 flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {/* Mobile pagination simple view */}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span className="font-medium">{movies.from}</span> to <span className="font-medium">{movies.to}</span> of <span className="font-medium">{movies.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {movies.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.visit(link.url, {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    });
                                                }
                                            }}
                                            disabled={!link.url}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                                ${link.active
                                                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-500 dark:text-indigo-400"
                                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                                                }
                                                ${!link.url && "opacity-50 cursor-not-allowed"}
                                                ${index === 0 ? "rounded-l-md" : ""}
                                                ${index === movies.links.length - 1 ? "rounded-r-md" : ""}
                                            `}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="5xl">
                <div className="p-6 dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {editingMovie
                            ? `Edit Movie: ${editingMovie.title}`
                            : "Create New Movie"}
                    </h2>
                    <MovieForm
                        movie={editingMovie}
                        genres={genres || []}
                        persons={persons || []}
                        onClose={closeModal}
                        onSuccess={() => {
                            // Optional: Show success toast
                        }}
                    />
                </div>
            </Modal>
        </AdminLayout>
    );
}
