import React, { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import PersonForm from './PersonForm';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function Persons({ persons }) {
    const { auth } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPerson, setEditingPerson] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const openCreateModal = () => {
        setEditingPerson(null);
        setIsModalOpen(true);
    };

    const openEditModal = (person) => {
        setEditingPerson(person);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPerson(null);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this person?')) {
            router.delete(route('admin.persons.destroy', id));
        }
    };

    const filteredPersons = useMemo(() => {
        if (!searchQuery) return persons;
        return persons.filter((person) =>
            person.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [persons, searchQuery]);

    return (
        <AdminLayout>
            <Head title="Manage Persons" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Persons
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage actors, directors, and other crew members.
                        </p>
                    </div>
                    <PrimaryButton onClick={openCreateModal} className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        Add Person
                    </PrimaryButton>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <TextInput
                            type="text"
                            placeholder="Search persons..."
                            className="w-full pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Persons Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bio</th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredPersons.length > 0 ? (
                                    filteredPersons.map((person) => (
                                        <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-sm">
                                                        {person.avatar_url ? (
                                                            <img className="h-full w-full object-cover" src={person.avatar_url} alt="" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                                <UserIcon className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{person.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                                {person.biography || 'No biography available'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(person)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg dark:text-indigo-400 dark:hover:bg-indigo-900/20 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    {auth.user.role === 'admin' && (
                                                        <button
                                                            onClick={() => handleDelete(person.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                                                            title="Delete"
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
                                                <UserIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                                <p>No persons found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-6 dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {editingPerson ? `Edit Person: ${editingPerson.name}` : 'Create New Person'}
                    </h2>
                    <PersonForm
                        person={editingPerson}
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
