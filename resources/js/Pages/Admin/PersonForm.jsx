import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import useFormPersistence from "@/Hooks/useFormPersistence";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import axios from 'axios';

export default function PersonForm({ person, onClose, onSuccess }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: person?.name || '',
        biography: person?.biography || '',
        birth_date: person?.birth_date || '',
        death_date: person?.death_date || '',
        place_of_birth: person?.place_of_birth || '',
        avatar_url: person?.avatar_url || '',
    });

    const storageKey = person?.id ? `person_form_update_${person.id}` : "person_form_create";
    const { clearStorage } = useFormPersistence(storageKey, data, setData);

    // TMDB State
    const [showTmdbModal, setShowTmdbModal] = useState(false);
    const [tmdbQuery, setTmdbQuery] = useState('');
    const [tmdbResults, setTmdbResults] = useState([]);
    const [tmdbLoading, setTmdbLoading] = useState(false);

    const searchTmdb = async (e) => {
        e.preventDefault();
        if (!tmdbQuery) return;
        setTmdbLoading(true);
        try {
            const response = await axios.post(route('admin.tmdb.search'), {
                query: tmdbQuery,
                type: 'person'
            });
            setTmdbResults(response.data.results || []);
        } catch (error) {
            console.error('TMDB Search Error:', error);
        } finally {
            setTmdbLoading(false);
        }
    };

    const fetchTmdbDetails = async (tmdbId) => {
        setTmdbLoading(true);
        try {
            const response = await axios.post(route('admin.tmdb.details'), {
                tmdb_id: tmdbId,
                type: 'person'
            });
            const details = response.data;

            // Map TMDB data to form
            setData(prev => ({
                ...prev,
                name: details.name,
                biography: details.biography,
                birth_date: details.birth_date || '',
                death_date: details.death_date || '',
                place_of_birth: details.place_of_birth || '',
                avatar_url: details.avatar_url || '',
            }));
            setShowTmdbModal(false);
        } catch (error) {
            console.error('TMDB Details Error:', error);
        } finally {
            setTmdbLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (person) {
            put(route('admin.persons.update', person.id), {
                onSuccess: () => {
                    clearStorage();
                    onSuccess();
                    onClose();
                },
            });
        } else {
            post(route('admin.persons.store'), {
                onSuccess: () => {
                    clearStorage();
                    onSuccess();
                    onClose();
                },
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <InputLabel htmlFor="name" value="Name" />
                                <SecondaryButton size="sm" onClick={() => setShowTmdbModal(true)} type="button">
                                    Fetch from TMDB
                                </SecondaryButton>
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="biography" value="Biography" />
                            <textarea
                                id="biography"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="4"
                                value={data.biography}
                                onChange={(e) => setData('biography', e.target.value)}
                            ></textarea>
                            <InputError message={errors.biography} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="avatar_url" value="Avatar URL" />
                            <TextInput
                                id="avatar_url"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.avatar_url}
                                onChange={(e) => setData('avatar_url', e.target.value)}
                            />
                            <InputError message={errors.avatar_url} className="mt-2" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="place_of_birth" value="Place of Birth" />
                            <TextInput
                                id="place_of_birth"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.place_of_birth}
                                onChange={(e) => setData('place_of_birth', e.target.value)}
                            />
                            <InputError message={errors.place_of_birth} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="birth_date" value="Birth Date" />
                            <TextInput
                                id="birth_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                            />
                            <InputError message={errors.birth_date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="death_date" value="Death Date" />
                            <TextInput
                                id="death_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.death_date}
                                onChange={(e) => setData('death_date', e.target.value)}
                            />
                            <InputError message={errors.death_date} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t pt-4">
                    <SecondaryButton onClick={onClose} disabled={processing} type="button">
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing} type="submit">
                        {person ? 'Update Person' : 'Create Person'}
                    </PrimaryButton>
                </div>
            </form>

            {/* TMDB Modal - Outside the main form to prevent nested form issues */}
            <Modal show={showTmdbModal} onClose={() => setShowTmdbModal(false)} maxWidth="2xl">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Search TMDB for People
                    </h2>
                    <form onSubmit={searchTmdb} className="flex gap-2 mb-4">
                        <TextInput
                            type="text"
                            className="w-full"
                            placeholder="Search for an actor, director, or crew member..."
                            value={tmdbQuery}
                            onChange={(e) => setTmdbQuery(e.target.value)}
                        />
                        <PrimaryButton type="submit" disabled={tmdbLoading}>
                            {tmdbLoading ? 'Searching...' : 'Search'}
                        </PrimaryButton>
                    </form>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {tmdbResults.map((result) => (
                            <button
                                key={result.id}
                                type="button"
                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer border border-gray-200 dark:border-gray-600 transition-colors text-left"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    fetchTmdbDetails(result.id);
                                }}
                            >
                                {result.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${result.profile_path}`}
                                        alt={result.name}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {result.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {result.known_for_department || 'Actor'}
                                    </p>
                                    {result.known_for && result.known_for.length > 0 && (
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            Known for: {result.known_for.slice(0, 2).map(item => item.title || item.name).join(', ')}
                                        </p>
                                    )}
                                </div>
                            </button>
                        ))}
                        {tmdbResults.length === 0 && !tmdbLoading && (
                            <p className="text-center text-gray-500 py-8">No results found. Try searching for an actor or director.</p>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}
