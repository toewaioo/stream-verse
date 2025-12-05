import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import GenreForm from "./GenreForm";
import { useTranslation } from "react-i18next";
export default function Genres({ genres }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGenre, setEditingGenre] = useState(null);
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

    return (
        <AdminLayout>
            <Head title="Manage Genres" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    {t("Genres")}
                                </h1>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder={t("Search genres...")}
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64"
                                    />
                                    <PrimaryButton onClick={openCreateModal}>
                                        {t("Add Genre")}
                                    </PrimaryButton>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                {t("Name")}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                {t("Slug")}
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                {t("Actions")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {genres.map((genre) => (
                                            <tr
                                                key={genre.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {genre.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {genre.slug}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(genre)
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                                    >
                                                        {t("Edit")}
                                                    </button>
                                                    {auth.user.role === 'admin' && (
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    genre.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            {t("Delete")}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
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
