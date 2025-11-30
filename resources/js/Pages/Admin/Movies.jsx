import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import MovieForm from "./MovieForm";
import { debounce } from "lodash";


export default function AdminMovies({ movies, genres, persons, auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const isFirst = useRef(true);
    console.log(movies);
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
            route("admin.series"),
            { search: searchQuery },
            { preserveState: true, replace: true }
        );
    });
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

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Header Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                                <h1 className="text-2xl font-bold">Movies</h1>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="flex-1 md:w-64">
                                        <TextInput
                                            type="text"
                                            placeholder="Search movies..."
                                            className="w-full"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                    <PrimaryButton onClick={openCreateModal}>
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Add Movie
                                    </PrimaryButton>
                                </div>
                            </div>

                            {/* Movies Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Movie
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Release Info
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Stats
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {movies.data.map((movie) => (
                                            <tr
                                                key={movie.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-16 w-12 bg-gray-200 rounded overflow-hidden">
                                                            {movie.poster_url ? (
                                                                <img
                                                                    className="h-16 w-12 object-cover"
                                                                    src={
                                                                        movie.poster_url
                                                                    }
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                                                                    N/A
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {movie.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {
                                                                    movie.original_title
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-gray-300">
                                                        {movie.release_date
                                                            ? new Date(
                                                                movie.release_date
                                                            ).getFullYear()
                                                            : "N/A"}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {movie.runtime
                                                            ? `${Math.floor(
                                                                movie.runtime /
                                                                60
                                                            )}h ${movie.runtime %
                                                            60
                                                            }m`
                                                            : ""}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col gap-1">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full w-fit ${movie.status ===
                                                                "released"
                                                                ? "bg-green-100 text-green-800"
                                                                : movie.status ===
                                                                    "upcoming"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                                }`}
                                                        >
                                                            {movie.status}
                                                        </span>
                                                        {movie.is_vip_only && (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 w-fit">
                                                                VIP Only
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <svg
                                                            className="w-4 h-4 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        {movie.rating_average ||
                                                            "0.0"}
                                                    </div>
                                                    <div className="text-xs mt-1">
                                                        {movie.view_count?.toLocaleString()}{" "}
                                                        views
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(movie)
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(movie)
                                                        }
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-1 flex-wrap">
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
                                            className={`px-4 py-2 text-sm rounded-md ${link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                } ${!link.url &&
                                                "opacity-50 cursor-not-allowed"
                                                }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="5xl">
                <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
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
