import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function GenreForm({ genre, onClose, onSuccess }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: genre?.name || '',
        slug: genre?.slug || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (genre) {
            put(route('admin.genres.update', genre.id), {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                },
            });
        } else {
            post(route('admin.genres.store'), {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                <InputLabel htmlFor="slug" value="Slug" />
                <TextInput
                    id="slug"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    required
                />
                <InputError message={errors.slug} className="mt-2" />
            </div>

            <div className="flex items-center justify-end gap-4 border-t pt-4">
                <SecondaryButton onClick={onClose} disabled={processing}>
                    Cancel
                </SecondaryButton>
                <PrimaryButton disabled={processing}>
                    {genre ? 'Update Genre' : 'Create Genre'}
                </PrimaryButton>
            </div>
        </form>
    );
}
