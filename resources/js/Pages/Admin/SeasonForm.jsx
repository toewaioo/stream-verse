import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function SeasonForm({ season, seriesList = [], onClose, onSuccess }) {
    const [activeTab, setActiveTab] = useState('details'); // 'details' or 'episodes'

    const { data, setData, post, put, processing, errors } = useForm({
        series_id: season?.series_id || '',
        season_number: season?.season_number || '',
        title: season?.title || '',
        description: season?.description || '',
        air_date: season?.air_date || '', // Changed from release_date to match DB
        poster_url: season?.poster_url || '',
        episodes: season?.episodes?.map(ep => ({
            id: ep.id,
            episode_number: ep.episode_number,
            title: ep.title,
            description: ep.description || '',
            air_date: ep.air_date || '',
            runtime: ep.runtime || '',
            poster_url: ep.poster_url || '',
            is_new: false,
        })) || []
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            },
            preserveScroll: true,
        };

        if (season) {
            put(route('admin.seasons.update', season.id), options);
        } else {
            post(route('admin.seasons.store'), options);
        }
    };

    const addEpisode = () => {
        const nextEpisodeNumber = data.episodes.length > 0
            ? Math.max(...data.episodes.map(e => parseInt(e.episode_number) || 0)) + 1
            : 1;

        setData('episodes', [
            ...data.episodes,
            {
                id: `new-${Date.now()}`, // Temporary ID for key
                episode_number: nextEpisodeNumber,
                title: '',
                description: '',
                air_date: '',
                runtime: '',
                poster_url: '',
                is_new: true
            }
        ]);
        setActiveTab('episodes');
    };

    const removeEpisode = (index) => {
        const newEpisodes = [...data.episodes];
        newEpisodes.splice(index, 1);
        setData('episodes', newEpisodes);
    };

    const updateEpisode = (index, field, value) => {
        const newEpisodes = [...data.episodes];
        newEpisodes[index][field] = value;
        setData('episodes', newEpisodes);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {season ? 'Edit Season' : 'New Season'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {season ? `Managing Season ${season.season_number}` : 'Create a new season and add episodes'}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'details'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        Season Details
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('episodes')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'episodes'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        Episodes ({data.episodes.length})
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {activeTab === 'details' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <InputLabel htmlFor="series_id" value="Series" />
                                <select
                                    id="series_id"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm transition-all duration-200"
                                    value={data.series_id}
                                    onChange={(e) => setData('series_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select Series</option>
                                    {seriesList.map(series => (
                                        <option key={series.id} value={series.id}>{series.title}</option>
                                    ))}
                                </select>
                                <InputError message={errors.series_id} className="mt-2" />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <InputLabel htmlFor="season_number" value="Season Number" />
                                <TextInput
                                    id="season_number"
                                    type="number"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.season_number}
                                    onChange={(e) => setData('season_number', e.target.value)}
                                    required
                                    placeholder="e.g. 1"
                                />
                                <InputError message={errors.season_number} className="mt-2" />
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="title" value="Season Title (Optional)" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Winter is Coming"
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm transition-all duration-200"
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter season synopsis..."
                                ></textarea>
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <InputLabel htmlFor="air_date" value="Air Date" />
                                <TextInput
                                    id="air_date"
                                    type="date"
                                    className="mt-1 block w-full rounded-xl"
                                    value={data.air_date}
                                    onChange={(e) => setData('air_date', e.target.value)}
                                />
                                <InputError message={errors.air_date} className="mt-2" />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <InputLabel htmlFor="poster_url" value="Poster URL" />
                                <div className="flex gap-3">
                                    <TextInput
                                        id="poster_url"
                                        type="url"
                                        className="mt-1 block w-full rounded-xl"
                                        value={data.poster_url}
                                        onChange={(e) => setData('poster_url', e.target.value)}
                                        placeholder="https://..."
                                    />
                                    {data.poster_url && (
                                        <div className="mt-1 w-12 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                                            <img src={data.poster_url} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.poster_url} className="mt-2" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'episodes' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Episode List
                            </h3>
                            <SecondaryButton onClick={addEpisode} type="button" className="!rounded-xl">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Episode
                            </SecondaryButton>
                        </div>

                        {data.episodes.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No episodes added yet.</p>
                                <button
                                    type="button"
                                    onClick={addEpisode}
                                    className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                                >
                                    Add your first episode
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.episodes.map((episode, index) => (
                                    <div
                                        key={episode.id || index}
                                        className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-200 group"
                                    >
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-1 flex items-start justify-center pt-2">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                                                    {episode.episode_number || '#'}
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-11 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <InputLabel value="Episode Number" className="text-xs uppercase tracking-wider text-gray-500" />
                                                        <TextInput
                                                            type="number"
                                                            className="mt-1 block w-full text-sm rounded-lg"
                                                            value={episode.episode_number}
                                                            onChange={(e) => updateEpisode(index, 'episode_number', e.target.value)}
                                                            placeholder="1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel value="Title" className="text-xs uppercase tracking-wider text-gray-500" />
                                                        <TextInput
                                                            type="text"
                                                            className="mt-1 block w-full text-sm rounded-lg"
                                                            value={episode.title}
                                                            onChange={(e) => updateEpisode(index, 'title', e.target.value)}
                                                            placeholder="Episode Title"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <InputLabel value="Air Date" className="text-xs uppercase tracking-wider text-gray-500" />
                                                        <TextInput
                                                            type="date"
                                                            className="mt-1 block w-full text-sm rounded-lg"
                                                            value={episode.air_date}
                                                            onChange={(e) => updateEpisode(index, 'air_date', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel value="Runtime (mins)" className="text-xs uppercase tracking-wider text-gray-500" />
                                                        <TextInput
                                                            type="number"
                                                            className="mt-1 block w-full text-sm rounded-lg"
                                                            value={episode.runtime}
                                                            onChange={(e) => updateEpisode(index, 'runtime', e.target.value)}
                                                            placeholder="45"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel value="Poster URL" className="text-xs uppercase tracking-wider text-gray-500" />
                                                        <TextInput
                                                            type="url"
                                                            className="mt-1 block w-full text-sm rounded-lg"
                                                            value={episode.poster_url}
                                                            onChange={(e) => updateEpisode(index, 'poster_url', e.target.value)}
                                                            placeholder="https://..."
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <InputLabel value="Description" className="text-xs uppercase tracking-wider text-gray-500" />
                                                    <textarea
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm text-sm"
                                                        rows="2"
                                                        value={episode.description}
                                                        onChange={(e) => updateEpisode(index, 'description', e.target.value)}
                                                        placeholder="Episode synopsis..."
                                                    ></textarea>
                                                </div>

                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeEpisode(index)}
                                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Remove Episode
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </form>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm flex justify-end space-x-3">
                <SecondaryButton onClick={onClose} disabled={processing} className="!rounded-xl">
                    Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleSubmit} disabled={processing} className="!rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500">
                    {processing ? 'Saving...' : (season ? 'Update Season' : 'Create Season')}
                </PrimaryButton>
            </div>
        </div>
    );
}
