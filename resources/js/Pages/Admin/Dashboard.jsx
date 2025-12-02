import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function AdminDashboard({ auth, stats }) {
    const { t } = useTranslation();
    return (
        <AdminLayout>
            <Head title={t("Admin Dashboard")} />
            <div className="p-6 bg-white dark:bg-slate-900 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-black dark:text-white ">{t('Admin Dashboard')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link
                        href={route("admin.movies")}
                        className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">{t('Movies')}</h2>
                        <div className="text-3xl font-bold">
                            {stats?.movies ?? "-"}
                        </div>
                        <div className="text-sm mt-2">{t('Manage all movies')}</div>
                    </Link>
                    <Link
                        href={route("admin.series")}
                        className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">{t('Series')}</h2>
                        <div className="text-3xl font-bold">
                            {stats?.series ?? "-"}
                        </div>
                        <div className="text-sm mt-2">{t('Manage all series')}</div>
                    </Link>
                    <Link
                        href={route("admin.genres")}
                        className="bg-yellow-500 text-white p-6 rounded shadow hover:bg-yellow-600 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">{t('Genres')}</h2>
                        <div className="text-3xl font-bold">
                            {stats?.genres ?? "-"}
                        </div>
                        <div className="text-sm mt-2">{t('Manage genres')}</div>
                    </Link>
                    <Link
                        href={route("admin.persons")}
                        className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">{t('Persons')}</h2>
                        <div className="text-3xl font-bold">
                            {stats?.persons ?? "-"}
                        </div>
                        <div className="text-sm mt-2">{t('Manage persons')}</div>
                    </Link>
                </div>
                
            </div>
        </AdminLayout>
    );
}
