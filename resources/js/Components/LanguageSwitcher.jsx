import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "my", name: "Myanmar", flag: "🇲🇲" },
    ];

    const currentLanguage =
        languages.find((lang) => i18n.language.startsWith(lang.code)) ||
        languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-lg shadow-gray-200/50 dark:shadow-black/20 ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                    <GlobeAltIcon
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                    />
                    <span className="uppercase">{currentLanguage.code}</span>
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </MenuButton>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-slate-700">
                    <div className="py-1">
                        {languages.map((language) => (
                            <MenuItem key={language.code}>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            changeLanguage(language.code)
                                        }
                                        className={`
                                            ${
                                                active
                                                    ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
                                                    : "text-gray-700 dark:text-gray-300"
                                            }
                                            group flex w-full items-center px-4 py-2 text-sm transition-colors duration-150
                                        `}
                                    >
                                        <span className="mr-3 text-lg">
                                            {language.flag}
                                        </span>
                                        {language.name}
                                        {currentLanguage.code ===
                                            language.code && (
                                            <span className="ml-auto text-indigo-600 dark:text-indigo-400">
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="3"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 12.75l6 6 9-13.5"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                )}
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}
