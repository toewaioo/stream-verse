import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SeriesForm from "./SeriesForm";

export default function AdminSeries({ series, genres, persons, auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSeries, setEditingSeries] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Debounced search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("admin.series"),
                { search: searchQuery },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const openCreateModal = () => {
        setEditingSeries(null);
        setIsModalOpen(true);
    };

    const openEditModal = (series) => {
        setEditingSeries(series);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSeries(null);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this series?")) {
            router.delete(route("admin.series.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Series" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                                <h1 className="text-2xl font-bold">Series</h1>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Search series..."
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <PrimaryButton onClick={openCreateModal}>
                                        Add Series
                                    </PrimaryButton>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Seasons
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {series.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                                                            {item.poster_url ? (
                                                                <img
                                                                    className="h-10 w-10 object-cover"
                                                                    src={
                                                                        item.poster_url
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
                                                                {item.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {
                                                                    item.original_title
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {item.seasons.length || 0}{" "}
                                                    Seasons
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status ===
                                                            "ongoing"
                                                            ? "bg-green-100 text-green-800"
                                                            : item.status ===
                                                                "ended"
                                                                ? "bg-gray-100 text-gray-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(item)
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
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
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="4xl">
                <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        {editingSeries
                            ? `Edit Series: ${editingSeries.title}`
                            : "Create New Series"}
                    </h2>
                    <SeriesForm
                        series={editingSeries}
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
