import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
export default function AdminDashboard({ auth, stats }) {
    return (
        <AdminLayout>
                    <Head title="Manage Genres" />
            <div className="p-6 bg-white dark:bg-slate-900 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link
                        href={route("admin.movies")}
                        className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">Movies</h2>
                        <div className="text-3xl font-bold">
                            {stats?.movies ?? "-"}
                        </div>
                        <div className="text-sm mt-2">Manage all movies</div>
                    </Link>
                    <Link
                        href={route("admin.series")}
                        className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">Series</h2>
                        <div className="text-3xl font-bold">
                            {stats?.series ?? "-"}
                        </div>
                        <div className="text-sm mt-2">Manage all series</div>
                    </Link>
                    <Link
                        href={route("admin.genres")}
                        className="bg-yellow-500 text-white p-6 rounded shadow hover:bg-yellow-600 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">Genres</h2>
                        <div className="text-3xl font-bold">
                            {stats?.genres ?? "-"}
                        </div>
                        <div className="text-sm mt-2">Manage genres</div>
                    </Link>
                    <Link
                        href={route("admin.persons")}
                        className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">Persons</h2>
                        <div className="text-3xl font-bold">
                            {stats?.persons ?? "-"}
                        </div>
                        <div className="text-sm mt-2">Manage persons</div>
                    </Link>
                </div>
                
            </div>
        </AdminLayout>
    );
}
