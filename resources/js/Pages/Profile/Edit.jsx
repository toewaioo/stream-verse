import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ mustVerifyEmail, status }) {
    const { t, i18n } = useTranslation();
    const user = usePage().props.auth.user;

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.BackButton.show();

        tg.onEvent("backButtonClicked", () => {
            window.history.back();
            //const prevRoute =
            //     sessionStorage.getItem("tgPrevRoute") || route("home");
            // router.visit(prevRoute, {
            //     preserveState: true,
            //     preserveScroll: true,
            // });
        });
        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick();
        };
    }, []);

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(i18n.language, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <Head title={t("Profile")} />
            <AuthenticatedLayout>
                <div className="pt-24 pb-12 md:pt-32 md:pb-16">
                    <div className="container flex-col items-center mx-auto px-6 md:px-12">
                        {/* Hero Section */}
                        <div className="relative overflow-hidden rounded-3xl md:max-w-5xl bg-white dark:bg-gradient-to-br from-indigo-400/40 via-purple-900 to-black border border-gray-200 dark:border-white/10 p-8 md:p-12 dark:backdrop-blur-sm">
                            <div className="absolute top-0 left-0 m-2">
                                <ThemeSwitcher />
                            </div>
                            <div className="absolute top-0 right-0 m-2">
                                <LanguageSwitcher />
                            </div>

                            <div className="relative flex flex-col md:flex-col items-center md:items-center md:justify-center gap-6 md:gap-8">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600/5 flex items-center justify-center shadow-lg shadow-purple-500/20 border-4 border-white dark:border-black/50">
                                        {user?.avatar_url ? (
                                            user?.avatar_url && (
                                                <div className="flex justify-center">
                                                    <img
                                                        src={user?.avatar_url}
                                                        alt={user?.name}
                                                        className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20"
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            <span className="text-3xl md:text-4xl font-bold text-white tracking-wider">
                                                {getInitials(user.name)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center  space-y-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                                        {user.name}
                                    </h1>
                                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center gap-2 md:gap-4 text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                            </svg>
                                            <span>{user.email}</span>
                                        </div>
                                        <span className="hidden md:inline text-gray-400 dark:text-gray-600">
                                            •
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>
                                                {t("Member since")}{" "}
                                                {user.created_at
                                                    ? formatDate(
                                                          user.created_at
                                                      )
                                                    : t("Recently")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex flex-wrap justify-center  gap-3">
                                        <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-white/5 border border-indigo-200 dark:border-white/10 text-xs font-medium text-indigo-800 dark:text-indigo-300">
                                            {t("Free Plan")}
                                        </span>
                                        {user.email_verified_at ? (
                                            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-xs font-medium text-green-800 dark:text-green-400 flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-3 h-3"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {t("Verified")}
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-xs font-medium text-yellow-800 dark:text-yellow-400">
                                                {t("Unverified")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 border-b border-gray-200 dark:border-white/10 pb-6">
                            <h2 className="text-2xl font-serif text-gray-900 dark:text-white">
                                {t("Account Settings")}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                                {t("Manage your profile details and security")}
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-2xl dark:backdrop-blur-sm">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </div>

                                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-2xl dark:backdrop-blur-sm">
                                    <UpdatePasswordForm className="max-w-xl" />
                                </div>
                            </div>

                            <div>
                                <div className="bg-red-100 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 p-6 md:p-8 rounded-2xl dark:backdrop-blur-sm">
                                    <DeleteUserForm className="max-w-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
