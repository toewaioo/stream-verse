import React, { useState, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GenreForm from "./GenreForm";
import { useTranslation } from "react-i18next";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    TagIcon,
} from "@heroicons/react/24/outline";

export default function Genres({ genres }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGenre, setEditingGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();
    const { auth } = usePage().props;

    const openCreateModal = () => {
        setEditingGenre(null);
        setIsModalOpen(true);
    };

    const openEditModal = (genre) => {
        setEditingGenre(genre);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingGenre(null);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this genre?")) {
            router.delete(route("admin.genres.destroy", id));
        }
    };

    const filteredGenres = useMemo(() => {
        if (!searchQuery) return genres;
        return genres.filter((genre) =>
            genre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            genre.slug.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [genres, searchQuery]);

    return (
        <AdminLayout>
            <Head title="Manage Genres" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t("Genres")}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage movie and series genres.
                        </p>
                    </div>
                    <PrimaryButton onClick={openCreateModal} className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        {t("Add Genre")}
                    </PrimaryButton>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <TextInput
                            type="text"
                            placeholder={t("Search genres...")}
                            className="w-full pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Genres Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Name")}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Slug")}
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredGenres.length > 0 ? (
                                    filteredGenres.map((genre) => (
                                        <tr
                                            key={genre.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                                                        <TagIcon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {genre.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-mono">
                                                    {genre.slug}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(genre)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg dark:text-indigo-400 dark:hover:bg-indigo-900/20 transition-colors"
                                                        title={t("Edit")}
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    {auth.user.role === "admin" && (
                                                        <button
                                                            onClick={() => handleDelete(genre.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                                                            title={t("Delete")}
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <TagIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                                <p>{t("No genres found")}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6 bg-white dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {editingGenre
                            ? `${t("Edit Genre")}: ${editingGenre.name}`
                            : t("Create New Genre")}
                    </h2>
                    <GenreForm
                        genre={editingGenre}
                        onClose={closeModal}
                        onSuccess={() => {
                            // Refresh data or show toast
                        }}
                    />
                </div>
            </Modal>
        </AdminLayout>
    );
}
