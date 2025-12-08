import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Crown, CheckCircle, AlertCircle, Calendar, Key,PlayCircle as Play } from 'lucide-react';
import Navbar from '@/Components/Navbar';
export default function Subscription({ auth, subscription }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        key: '',
    });

    const handleRedeem = (e) => {
        e.preventDefault();
        post(route('subscription.redeem'), {
            onSuccess: () => reset('key'),
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isVip = subscription && new Date(subscription.end_date) > new Date();

    return (
         <div className="min-h-screen bg-gray-100 dark:bg-black">
                    <Navbar/>
            <Head title="VIP Subscription" />

            <div className="py-24">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Status Card */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                                    Subscription Status
                                </h3>
                                {isVip ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        Inactive
                                    </span>
                                )}
                            </div>

                            {isVip ? (
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-indigo-100 font-medium mb-1">Current Plan</p>
                                            <h4 className="text-3xl font-bold mb-4">VIP Member</h4>
                                            <div className="flex items-center text-indigo-100">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Expires on {formatDate(subscription.end_date)}</span>
                                            </div>
                                        </div>
                                        <Crown className="w-16 h-16 text-white/20" />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
                                    <Crown className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Active Subscription</h4>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                        Upgrade to VIP to unlock exclusive content, ad-free viewing, and higher quality streams.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Redeem Key Card */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                <Key className="w-5 h-5 mr-2 text-indigo-500" />
                                Redeem VIP Key
                            </h3>

                            <form onSubmit={handleRedeem} className="max-w-xl">
                                <div className="mb-4">
                                    <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Enter your activation key
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            id="key"
                                            type="text"
                                            value={data.key}
                                            onChange={(e) => setData('key', e.target.value)}
                                            className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                        />
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                        >
                                            {processing ? 'Redeeming...' : 'Redeem'}
                                        </button>
                                    </div>
                                    {errors.key && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.key}</p>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    VIP keys can be purchased from our official resellers or obtained through special promotions.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
                                <Play className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ad-Free Experience</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enjoy your favorite movies and shows without any interruptions.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                                <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Exclusive Content</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Access to VIP-only movies, series, and early releases.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/50 rounded-lg flex items-center justify-center mb-4">
                                <CheckCircle className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Highest Quality</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Stream in 4K Ultra HD and enjoy crystal clear audio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
