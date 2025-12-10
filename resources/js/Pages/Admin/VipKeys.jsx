import { useState, useMemo } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useTranslation } from "react-i18next";
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    KeyIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import { debounce } from "lodash";

export default function VipKeys({ auth, vipKeys, filters }) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingKey, setEditingKey] = useState(null);
    const [keyToDelete, setKeyToDelete] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const [copiedKeyId, setCopiedKeyId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        key: "",
        duration_days: 30,
        max_uses: "",
        expires_at: "",
        is_active: true,
    });

    const openModal = (key = null) => {
        if (key) {
            setEditingKey(key);
            setData({
                key: key.key,
                duration_days: key.duration_days,
                max_uses: key.max_uses || "",
                expires_at: key.expires_at ? key.expires_at.split('T')[0] : "",
                is_active: Boolean(key.is_active),
            });
        } else {
            setEditingKey(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingKey(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingKey) {
            put(route("admin.vip-keys.update", editingKey.id), {
                onSuccess: closeModal,
            });
        } else {
            post(route("admin.vip-keys.store"), {
                onSuccess: closeModal,
            });
        }
    };

    const openDeleteModal = (key) => {
        setKeyToDelete(key);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setKeyToDelete(null);
    };

    const handleDelete = () => {
        if (keyToDelete) {
            destroy(route("admin.vip-keys.destroy", keyToDelete.id), {
                onSuccess: closeDeleteModal,
            });
        }
    };

    const handleSearch = useMemo(
        () =>
            debounce((query) => {
                router.get(
                    route("admin.vip-keys.index"),
                    { search: query },
                    { preserveState: true, replace: true }
                );
            }, 300),
        []
    );

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
    };

    const copyToClipboard = (key, id) => {
        navigator.clipboard.writeText(key);
        setCopiedKeyId(id);
        setTimeout(() => setCopiedKeyId(null), 2000);
    };

    const getStatusBadge = (key) => {
        if (!key.is_active) {
            return (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {t("Inactive")}
                </span>
            );
        }
        if (key.expires_at && new Date(key.expires_at) < new Date()) {
            return (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                    {t("Expired")}
                </span>
            );
        }
        if (key.max_uses && key.uses_count >= key.max_uses) {
            return (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {t("Depleted")}
                </span>
            );
        }
        return (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {t("Active")}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title={t("VIP Keys")} />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <KeyIcon className="w-8 h-8 text-amber-500" />
                            {t("VIP Keys")}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t("Manage access keys for VIP subscriptions.")}
                        </p>
                    </div>
                    <PrimaryButton onClick={() => openModal()} className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        {t("Generate Key")}
                    </PrimaryButton>
                </div>

                {/* Search & Filter */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <TextInput
                            type="text"
                            placeholder={t("Search keys...")}
                            value={search}
                            onChange={onSearchChange}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Key")}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Duration")}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Status")}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Usage")}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Expires At")}
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t("Actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {vipKeys.data.length > 0 ? (
                                    vipKeys.data.map((key) => (
                                        <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                                                        {key.key}
                                                    </code>
                                                    <button
                                                        onClick={() => copyToClipboard(key.key, key.id)}
                                                        className="text-gray-400 hover:text-indigo-500 transition-colors"
                                                        title={t("Copy to clipboard")}
                                                    >
                                                        {copiedKeyId === key.id ? (
                                                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <ClipboardDocumentIcon className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {key.duration_days} {t("Days")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(key)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {key.uses_count} / {key.max_uses ? key.max_uses : '∞'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {key.expires_at ? new Date(key.expires_at).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openModal(key)}
                                                        className="p-1 rounded-full text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
                                                        title={t("Edit")}
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(key)}
                                                        className="p-1 rounded-full text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                                                        title={t("Delete")}
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <KeyIcon className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                                                <p className="text-lg font-medium">{t("No VIP keys found")}</p>
                                                <p className="text-sm mt-1">{t("Try adjusting your search or generate a new key.")}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination can be added here if needed, similar to Movies/Series pages */}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {editingKey ? t("Edit VIP Key") : t("Generate VIP Key")}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="key" value={t("Key Code")} />
                            <TextInput
                                id="key"
                                type="text"
                                className="mt-1 block w-full font-mono"
                                value={data.key}
                                onChange={(e) => setData("key", e.target.value)}
                                placeholder={t("Leave empty to auto-generate")}
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {t("A random 16-character string will be generated if left blank.")}
                            </p>
                            {errors.key && <div className="text-red-500 text-sm mt-1">{errors.key}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="duration_days" value={t("Duration (Days)")} />
                                <TextInput
                                    id="duration_days"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.duration_days}
                                    onChange={(e) => setData("duration_days", e.target.value)}
                                    required
                                    min="1"
                                />
                                {errors.duration_days && <div className="text-red-500 text-sm mt-1">{errors.duration_days}</div>}
                            </div>

                            <div>
                                <InputLabel htmlFor="max_uses" value={t("Max Uses")} />
                                <TextInput
                                    id="max_uses"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.max_uses}
                                    onChange={(e) => setData("max_uses", e.target.value)}
                                    placeholder={t("Leave empty for unlimited")}
                                    min="1"
                                />
                                {errors.max_uses && <div className="text-red-500 text-sm mt-1">{errors.max_uses}</div>}
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="expires_at" value={t("Expiration Date")} />
                            <TextInput
                                id="expires_at"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.expires_at}
                                onChange={(e) => setData("expires_at", e.target.value)}
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {t("Optional. The key will stop working after this date.")}
                            </p>
                            {errors.expires_at && <div className="text-red-500 text-sm mt-1">{errors.expires_at}</div>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="is_active"
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                                checked={data.is_active}
                                onChange={(e) => setData("is_active", e.target.checked)}
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                {t("Active")}
                            </label>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <SecondaryButton onClick={closeModal} disabled={processing}>
                                {t("Cancel")}
                            </SecondaryButton>
                            <PrimaryButton type="submit" disabled={processing}>
                                {editingKey ? t("Update Key") : t("Generate Key")}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {t("Delete VIP Key")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {t("Are you sure you want to delete this VIP key? This action cannot be undone.")}
                    </p>
                    <div className="flex justify-end gap-4">
                        <SecondaryButton onClick={closeDeleteModal} disabled={processing}>
                            {t("Cancel")}
                        </SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>
                            {t("Delete Key")}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
