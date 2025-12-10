import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    FilmIcon,
    TvIcon,
    TagIcon,
    UserGroupIcon,
    UsersIcon,
    StarIcon,
    EyeIcon,
    CreditCardIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    MinusIcon,
} from "@heroicons/react/24/outline";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from "recharts";

const StatsCard = ({ title, value, icon: Icon, color, growth, trend, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {title}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {value}
                </h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
                {description}
            </span>
            {growth !== undefined && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                    {trend === 'up' && <ArrowTrendingUpIcon className="w-3 h-3" />}
                    {trend === 'down' && <ArrowTrendingDownIcon className="w-3 h-3" />}
                    {trend === 'neutral' && <MinusIcon className="w-3 h-3" />}
                    {growth}%
                </div>
            )}
        </div>
    </div>
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard({ auth, stats, charts, filters }) {
    const { t } = useTranslation();

    const handleRangeChange = (range) => {
        router.visit(route('admin.dashboard'), {
            data: { range },
            preserveState: true,
            preserveScroll: true,
            only: ['stats', 'charts', 'filters'],
        });
    };

    const statItems = [
        {
            title: t("Total Movies"),
            value: stats?.movies?.value ?? 0,
            growth: stats?.movies?.growth,
            trend: stats?.movies?.trend,
            icon: FilmIcon,
            color: "bg-blue-500",
            description: t("Movies in database"),
        },
        {
            title: t("Total Series"),
            value: stats?.series?.value ?? 0,
            growth: stats?.series?.growth,
            trend: stats?.series?.trend,
            icon: TvIcon,
            color: "bg-green-500",
            description: t("Series in database"),
        },
        {
            title: t("Total Users"),
            value: stats?.users?.value ?? 0,
            growth: stats?.users?.growth,
            trend: stats?.users?.trend,
            icon: UsersIcon,
            color: "bg-indigo-500",
            description: t("Registered users"),
        },
        {
            title: t("Total Views"),
            value: stats?.total_views?.value ?? 0,
            growth: stats?.total_views?.growth,
            trend: stats?.total_views?.trend,
            icon: EyeIcon,
            color: "bg-purple-500",
            description: t("Across all content"),
        },
        {
            title: t("Active VIP"),
            value: stats?.active_vip?.value ?? 0,
            growth: stats?.active_vip?.growth,
            trend: stats?.active_vip?.trend,
            icon: CreditCardIcon,
            color: "bg-amber-500",
            description: t("Premium subscribers"),
        },
        {
            title: t("Total Reviews"),
            value: stats?.reviews?.value ?? 0,
            growth: stats?.reviews?.growth,
            trend: stats?.reviews?.trend,
            icon: StarIcon,
            color: "bg-pink-500",
            description: t("User reviews"),
        },
        {
            title: t("Genres"),
            value: stats?.genres?.value ?? 0,
            growth: stats?.genres?.growth,
            trend: stats?.genres?.trend,
            icon: TagIcon,
            color: "bg-teal-500",
            description: t("Content categories"),
        },
        {
            title: t("Persons"),
            value: stats?.persons?.value ?? 0,
            growth: stats?.persons?.growth,
            trend: stats?.persons?.trend,
            icon: UserGroupIcon,
            color: "bg-cyan-500",
            description: t("Cast & Crew"),
        },
    ];

    const ranges = [
        { label: '7 Days', value: '7d' },
        { label: '30 Days', value: '30d' },
        { label: '90 Days', value: '90d' },
        { label: '1 Year', value: '1y' },
    ];

    return (
        <AdminLayout>
            <Head title={t("Admin Dashboard")} />

            <div className="space-y-8">
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t("Dashboard Overview")}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t("Welcome back")}, {auth.user.name}. {t("Here's what's happening today.")}
                        </p>
                    </div>
                    <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-100 dark:border-gray-700/50">
                        {ranges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => handleRangeChange(range.value)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filters?.range === range.value
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statItems.map((item, index) => (
                        <StatsCard key={index} {...item} />
                    ))}
                </div>

                {/* Charts Section */}
                {charts && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {/* User Growth Chart */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6 xl:col-span-2">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                {t("User Growth")}
                            </h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={charts.userGrowth}>
                                        <defs>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                            itemStyle={{ color: "#fff" }}
                                        />
                                        <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsers)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Content Distribution Chart */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                {t("Content Distribution")}
                            </h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={charts.contentDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {charts.contentDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                            itemStyle={{ color: "#fff" }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Genres Chart */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6 xl:col-span-3">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                {t("Top Genres")}
                            </h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={charts.topGenres}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                            itemStyle={{ color: "#fff" }}
                                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                        />
                                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Recent Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {t("Recent Users")}
                            </h2>
                            <Link href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                {t("View All")}
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {stats?.recent_users?.map((user) => (
                                <div key={user.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                            {(!stats?.recent_users || stats.recent_users.length === 0) && (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    {t("No recent users found")}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Popular Movies */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {t("Popular Movies")}
                            </h2>
                            <Link href={route('admin.movies')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                {t("View All")}
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {stats?.popular_movies?.map((movie) => (
                                <div key={movie.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                                    <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                        {movie.poster_url ? (
                                            <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <FilmIcon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {movie.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                                {movie.rating_average} ★
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {movie.release_date ? new Date(movie.release_date).getFullYear() : '-'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <EyeIcon className="w-4 h-4 text-gray-400" />
                                        {movie.view_count}
                                    </div>
                                </div>
                            ))}
                            {(!stats?.popular_movies || stats.popular_movies.length === 0) && (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    {t("No popular movies found")}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Popular Series */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {t("Popular Series")}
                            </h2>
                            <Link href={route('admin.series')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                {t("View All")}
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {stats?.popular_series?.map((series) => (
                                <div key={series.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                                    <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                        {series.poster_url ? (
                                            <img src={series.poster_url} alt={series.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <TvIcon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {series.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                                {series.rating_average} ★
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {series.seasons_count} Seasons
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <EyeIcon className="w-4 h-4 text-gray-400" />
                                        {series.view_count}
                                    </div>
                                </div>
                            ))}
                            {(!stats?.popular_series || stats.popular_series.length === 0) && (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    {t("No popular series found")}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
