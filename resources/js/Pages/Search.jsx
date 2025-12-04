import React, { useEffect } from "react";
import { Link, Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import SeoHead from "@/Components/SeoHead";
import MediaCard from "@/Components/MediaCard";
import { useTranslation } from "react-i18next";


export default function Search({ results, query, seo }) {
    const { t } = useTranslation();
    useEffect(() => {
            const tg = window.Telegram?.WebApp;
            if (!tg) return;
    
            tg.BackButton.show();
    
            tg.onEvent("backButtonClicked", () => {
                const prevRoute = sessionStorage.getItem("tgPrevRoute") || route("home");
                router.visit(prevRoute);
            });
        }, []);
    return (
        <>
            <SeoHead
                title={seo?.title}
                description={seo?.description}
            />
            <div className="min-h-screen bg-gray-100 dark:bg-[#050505] text-gray-800 dark:text-white font-sans selection:bg-gray-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
                <Navbar />

                <div className="container mx-auto px-6 md:px-12 py-32">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 dark:text-white mb-4">
                            {t('Search Results')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {results.length > 0
                                ? t(`Found ${results.length} results for ${query}`)
                                : t(`No results found for "${query}"`)
                            }
                        </p>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                            {results.map((item) => (
                                <MediaCard
                                    key={`${item.type}-${item.id}`}
                                    item={item}
                                    type={item.type}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif text-gray-800 dark:text-white mb-2">{t('No matches found')}</h3>
                            <p className="text-gray-600 dark:text-gray-500 max-w-md">
                                {t("We couldn't find any movies or series matching your search. Try checking for typos or using different keywords.")}
                            </p>
                            <Link
                                href={route('home')}
                                className="mt-8 px-8 py-3 bg-gray-800 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
                            >
                                {t('Back to Home')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
