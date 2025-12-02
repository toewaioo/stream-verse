import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeSwitcher from '@/Components/ThemeSwitcher';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-[#0a0e17] relative overflow-hidden">
            {/* Background Gradients for dark mode */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] hidden dark:block" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px] hidden dark:block" />

            <div className="absolute top-4 right-4">
                <ThemeSwitcher />
            </div>

            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500 dark:text-gray-300" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-[#1f2937]/60 dark:backdrop-blur-lg dark:border dark:border-white/5 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
