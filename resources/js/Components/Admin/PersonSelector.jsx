import React, { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

export default function PersonSelector({ value, onChange, persons: initialPersons = [] }) {
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [persons, setPersons] = useState(initialPersons);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (value) {
            const found = persons.find(p => p.id === parseInt(value));
            setSelectedPerson(found || null);
        } else {
            setSelectedPerson(null);
        }
    }, [value, persons]);

    const filteredPersons =
        query === ''
            ? persons
            : persons.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase());
            });

    const handleCreate = async () => {
        if (!query) return;
        setIsCreating(true);
        try {
            const response = await axios.post(route('admin.persons.store'), {
                name: query,
            }, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            const newPerson = response.data;
            setPersons([...persons, newPerson]);
            setSelectedPerson(newPerson);
            onChange(newPerson.id);
            setQuery('');
        } catch (error) {
            console.error("Failed to create person", error);
            // Ideally show a toast error here
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Combobox as="div" value={selectedPerson} onChange={(person) => {
            if (person) {
                setSelectedPerson(person);
                onChange(person.id);
            }
        }}>
            <div className="relative mt-1">
                <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(person) => person?.name}
                    placeholder="Select or create a person..."
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredPersons.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800">
                        {filteredPersons.map((person) => (
                            <Combobox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-300'
                                    }`
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex items-center">
                                            {person.photo_url && (
                                                <img src={person.photo_url} alt="" className="h-6 w-6 flex-shrink-0 rounded-full mr-2" />
                                            )}
                                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {person.name}
                                            </span>
                                        </div>

                                        {selected && (
                                            <span
                                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-indigo-600'
                                                    }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}

                {query !== '' && filteredPersons.length === 0 && (
                    <div className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800">
                        <div
                            className="relative cursor-pointer select-none py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-indigo-600 hover:text-white"
                            onClick={handleCreate}
                        >
                            {isCreating ? 'Creating...' : `Create "${query}"`}
                        </div>
                    </div>
                )}
            </div>
        </Combobox>
    );
}
