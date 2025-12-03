import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative p-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${theme === 'light'
                    ? 'bg-white/80 text-amber-500 hover:bg-white shadow-lg shadow-amber-500/20 border border-amber-100'
                    : 'bg-slate-800/80 text-indigo-400 hover:bg-slate-800 shadow-lg shadow-indigo-500/20 border border-slate-700'}
            `}
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6 overflow-hidden">
                <div className={`absolute inset-0 transform transition-transform duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
                    <MoonIcon className="w-6 h-6" />
                </div>
                <div className={`absolute inset-0 transform transition-transform duration-500 ${theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                    <SunIcon className="w-6 h-6" />
                </div>
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
