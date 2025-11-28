import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function PersonForm({ person, onClose, onSuccess }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: person?.name || '',
        biography: person?.biography || '',
        birth_date: person?.birth_date || '',
        death_date: person?.death_date || '',
        place_of_birth: person?.place_of_birth || '',
        avatar_url: person?.avatar_url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (person) {
            put(route('admin.persons.update', person.id), {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                },
            });
        } else {
            post(route('admin.persons.store'), {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
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
                <SecondaryButton onClick={onClose} disabled={processing}>
                    Cancel
                </SecondaryButton>
                <PrimaryButton disabled={processing}>
                    {person ? 'Update Person' : 'Create Person'}
                </PrimaryButton>
            </div>
        </form>
    );
}
