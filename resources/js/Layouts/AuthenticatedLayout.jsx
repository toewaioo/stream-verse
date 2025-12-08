import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black">
            <Navbar />
            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <Footer />
        </div>
    );
}
