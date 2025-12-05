import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SeasonForm from './SeasonForm';

export default function AdminSeasons({ seasons, seriesList, auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSeason, setEditingSeason] = useState(null);

    const openCreateModal = () => {
        setEditingSeason(null);
        setIsModalOpen(true);
    };

    const openEditModal = (season) => {
        setEditingSeason(season);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSeason(null);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this season?')) {
            router.delete(route('admin.seasons.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Seasons" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Seasons</h1>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <input type="text" placeholder="Search seasons..." className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64" />
                                    <PrimaryButton onClick={openCreateModal}>
                                        Add Season
                                    </PrimaryButton>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Series</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Season Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Episodes</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {seasons.data.map((season) => (
                                            <tr key={season.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {season.series?.title || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    Season {season.season_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {season.episodes?.length || 0} Episodes
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openEditModal(season)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">Edit</button>
                                                    {auth.user.role === 'admin' && (
                                                        <button onClick={() => handleDelete(season.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
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

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="4xl">
                <SeasonForm
                    season={editingSeason}
                    seriesList={seriesList || []}
                    onClose={closeModal}
                    onSuccess={() => {
                        // Refresh data or show toast
                    }}
                />
            </Modal>
        </AdminLayout>
    );
}
