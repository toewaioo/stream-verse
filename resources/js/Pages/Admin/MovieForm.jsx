import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import useFormPersistence from "@/Hooks/useFormPersistence";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Checkbox from "@/Components/Checkbox";
import PersonSelector from "@/Components/Admin/PersonSelector";
import Modal from "@/Components/Modal";
import axios from "axios";

export default function MovieForm({
    movie,
    genres = [],
    persons = [],
    onClose,
    onSuccess,
}) {
    const [currentStep, setCurrentStep] = useState(1);
    const { data, setData, post, put, processing, errors } = useForm({
        title: movie?.title || "",
        slug: movie?.slug || "",
        original_title: movie?.original_title || "",
        description: movie?.description || "",
        release_date: movie?.release_date || "",
        runtime: movie?.runtime || "",
        language: movie?.language || "en",
        country: movie?.country || "",
        status: movie?.status || "released",
        visibility_status: movie?.visibility_status || "public",
        is_vip_only: movie?.is_vip_only || false,
        poster_url: movie?.poster_url || "",
        banner_url: movie?.banner_url || "",
        trailer_url: movie?.trailer_url || "",
        budget: movie?.budget || "",
        revenue: movie?.revenue || "",
        imdb_id: movie?.imdb_id || "",
        age_rating: movie?.age_rating || "",
        genres: movie?.genres?.map((g) => g.id) || [],
        persons:
            movie?.persons?.map((p) => ({
                person_id: p.person_id,
                role_type: p.role_type,
                character_name: p.character_name,
            })) || [],
        watch_links: movie?.watch_links || [],
        download_links: movie?.download_links || [],
    });

    const storageKey = movie?.id
        ? `movie_form_update_${movie.id}`
        : "movie_form_create";
    const { clearStorage } = useFormPersistence(storageKey, data, setData);

    // TMDB State
    const [showTmdbModal, setShowTmdbModal] = useState(false);
    const [tmdbQuery, setTmdbQuery] = useState("");
    const [tmdbResults, setTmdbResults] = useState([]);
    const [tmdbLoading, setTmdbLoading] = useState(false);

    const searchTmdb = async (e) => {
        e.preventDefault();
        if (!tmdbQuery) return;
        setTmdbLoading(true);
        try {
            const response = await axios.post(route("admin.tmdb.search"), {
                query: tmdbQuery,
                type: "movie",
            });
            setTmdbResults(response.data.results || []);
        } catch (error) {
            console.error("TMDB Search Error:", error);
        } finally {
            setTmdbLoading(false);
        }
    };

    const fetchTmdbDetails = async (tmdbId) => {
        setTmdbLoading(true);
        try {
            const response = await axios.post(route("admin.tmdb.details"), {
                tmdb_id: tmdbId,
                type: "movie",
            });
            const details = response.data;

            // Map TMDB data to form
            setData((prev) => ({
                ...prev,
                title: details.title,
                original_title: details.original_title,
                description: details.description,
                release_date: details.release_date,
                runtime: details.runtime,
                language: details.language,
                status: details.status === "released" ? "released" : "upcoming",
                imdb_id: details.imdb_id,
                budget: details.budget,
                revenue: details.revenue,
                poster_url: details.poster_url,
                banner_url: details.banner_url,
                trailer_url: details.trailer_url,
                age_rating: details.age_rating,
                // Note: Genres and Persons mapping would require more complex logic
                // to match existing DB records or create new ones.
                // For now, we'll just fill the text fields.
            }));
            setShowTmdbModal(false);
        } catch (error) {
            console.error("TMDB Details Error:", error);
        } finally {
            setTmdbLoading(false);
        }
    };

    const [slugError, setSlugError] = useState("");

    // Auto-generate slug from title
    React.useEffect(() => {
        if (data.title && !movie?.id) {
            // Only auto-generate on create or if explicitly wanted
            const slug = data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            setData("slug", slug);
        }
    }, [data.title]);

    // Realtime slug check
    React.useEffect(() => {
        const checkSlug = async () => {
            if (!data.slug) return;

            try {
                const response = await axios.get(
                    route("admin.movies.check-slug"),
                    {
                        params: {
                            slug: data.slug,
                            id: movie?.id,
                        },
                    }
                );

                if (response.data.exists) {
                    setSlugError("This slug is already taken.");
                } else {
                    setSlugError("");
                }
            } catch (error) {
                console.error("Error checking slug:", error);
            }
        };

        const timeoutId = setTimeout(() => {
            checkSlug();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [data.slug, movie?.id]);

    const handleGenreChange = (genreId) => {
        const currentGenres = data.genres;
        if (currentGenres.includes(genreId)) {
            setData(
                "genres",
                currentGenres.filter((id) => id !== genreId)
            );
        } else {
            setData("genres", [...currentGenres, genreId]);
        }
    };

    const addPerson = () => {
        setData("persons", [
            ...data.persons,
            { person_id: "", role_type: "actor", character_name: "" },
        ]);
    };

    const removePerson = (index) => {
        const newPersons = [...data.persons];
        newPersons.splice(index, 1);
        setData("persons", newPersons);
    };

    const updatePerson = (index, field, value) => {
        const newPersons = [...data.persons];
        newPersons[index][field] = value;
        setData("persons", newPersons);
    };

    // Watch Links Handlers
    const addWatchLink = () => {
        setData("watch_links", [
            ...data.watch_links,
            {
                server_name: "",
                url: "",
                embed_code: "",
                quality: "HD",
                type: "url",
                is_vip_only: false,
            },
        ]);
    };

    const removeWatchLink = (index) => {
        const newLinks = [...data.watch_links];
        newLinks.splice(index, 1);
        setData("watch_links", newLinks);
    };

    const updateWatchLink = (index, field, value) => {
        const newLinks = [...data.watch_links];
        newLinks[index][field] = value;
        setData("watch_links", newLinks);
    };

    // Download Links Handlers
    const addDownloadLink = () => {
        setData("download_links", [
            ...data.download_links,
            {
                server_name: "",
                url: "",
                quality: "HD",
                file_format: "MKV",
                file_size: "",
                is_vip_only: false,
            },
        ]);
    };

    const removeDownloadLink = (index) => {
        const newLinks = [...data.download_links];
        newLinks.splice(index, 1);
        setData("download_links", newLinks);
    };

    const updateDownloadLink = (index, field, value) => {
        const newLinks = [...data.download_links];
        newLinks[index][field] = value;
        setData("download_links", newLinks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie && movie.id) {
            // Edit mode: use PUT
            put(route("admin.movies.update", movie.id), {
                onSuccess: () => {
                    clearStorage();
                    if (onSuccess) onSuccess();
                    if (onClose) onClose();
                },
            });
        } else {
            // Create mode: use POST
            post(route("admin.movies.store"), {
                onSuccess: () => {
                    clearStorage();
                    if (onSuccess) onSuccess();
                    if (onClose) onClose();
                },
            });
        }
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <div className="flex justify-between items-center mb-2">
                            <InputLabel htmlFor="title" value="Movie Title" />
                            <SecondaryButton
                                size="sm"
                                onClick={() => setShowTmdbModal(true)}
                                type="button"
                            >
                                Fetch from TMDB
                            </SecondaryButton>
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                            placeholder="e.g. Inception"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="original_title"
                            value="Original Title"
                        />
                        <TextInput
                            id="original_title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.original_title}
                            onChange={(e) =>
                                setData("original_title", e.target.value)
                            }
                            placeholder="Original language title"
                        />
                        <InputError
                            message={errors.original_title}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="slug" value="Slug" />
                        <TextInput
                            id="slug"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                            placeholder="e.g. inception"
                        />
                        <InputError
                            message={errors.slug || slugError}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="imdb_id" value="IMDb ID" />
                        <TextInput
                            id="imdb_id"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.imdb_id}
                            onChange={(e) => setData("imdb_id", e.target.value)}
                            placeholder="tt1375666"
                        />
                        <InputError message={errors.imdb_id} className="mt-2" />
                    </div>
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="description" value="Synopsis" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full text-black border-gray-300 dark:border-gray-300 dark:bg-gray-300 dark:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="4"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Enter a detailed description of the movie..."
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Details & Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel
                            htmlFor="release_date"
                            value="Release Date"
                        />
                        <TextInput
                            id="release_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.release_date.split("T")[0]}
                            onChange={(e) =>
                                setData("release_date", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.release_date}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="runtime"
                            value="Runtime (minutes)"
                        />
                        <TextInput
                            id="runtime"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.runtime}
                            onChange={(e) => setData("runtime", e.target.value)}
                            placeholder="148"
                        />
                        <InputError message={errors.runtime} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="released">Released</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="rumored">Rumored</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="visibility_status"
                            value="Visibility"
                        />
                        <select
                            id="visibility_status"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.visibility_status}
                            onChange={(e) =>
                                setData("visibility_status", e.target.value)
                            }
                        >
                            <option value="public">Public</option>
                            <option value="hidden">Hidden</option>
                        </select>
                        <InputError
                            message={errors.visibility_status}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="age_rating" value="Age Rating" />
                        <select
                            id="age_rating"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.age_rating}
                            onChange={(e) =>
                                setData("age_rating", e.target.value)
                            }
                        >
                            <option value="G">Select Rating</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R - Restricted</option>
                            <option value="18+">18+</option>
                        </select>
                        <InputError
                            message={errors.age_rating}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="language" value="Language" />
                        <TextInput
                            id="language"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.language}
                            onChange={(e) =>
                                setData("language", e.target.value)
                            }
                            placeholder="en"
                        />
                        <InputError
                            message={errors.language}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="country" value="Country" />
                        <TextInput
                            id="country"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.country}
                            onChange={(e) => setData("country", e.target.value)}
                            placeholder="USA"
                        />
                        <InputError message={errors.country} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="budget" value="Budget" />
                        <TextInput
                            id="budget"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.budget}
                            onChange={(e) => setData("budget", e.target.value)}
                            placeholder="160000000"
                        />
                        <InputError message={errors.budget} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="revenue" value="Revenue" />
                        <TextInput
                            id="revenue"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.revenue}
                            onChange={(e) => setData("revenue", e.target.value)}
                            placeholder="836800000"
                        />
                        <InputError message={errors.revenue} className="mt-2" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                            <Checkbox
                                name="is_vip_only"
                                checked={data.is_vip_only}
                                onChange={(e) =>
                                    setData("is_vip_only", e.target.checked)
                                }
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                    VIP Exclusive
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    Only accessible to VIP members
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    Media Assets
                </h3>
                <div className="space-y-4">
                    <div>
                        <InputLabel htmlFor="poster_url" value="Poster URL" />
                        <div className="flex gap-4">
                            <TextInput
                                id="poster_url"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.poster_url}
                                onChange={(e) =>
                                    setData("poster_url", e.target.value)
                                }
                                placeholder="https://..."
                            />
                            {data.poster_url && (
                                <div className="flex-shrink-0 h-10 w-8 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                    <img
                                        src={data.poster_url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <InputError
                            message={errors.poster_url}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="banner_url"
                            value="Banner/Backdrop URL"
                        />
                        <div className="flex gap-4">
                            <TextInput
                                id="banner_url"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.banner_url}
                                onChange={(e) =>
                                    setData("banner_url", e.target.value)
                                }
                                placeholder="https://..."
                            />
                            {data.banner_url && (
                                <div className="flex-shrink-0 h-10 w-16 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                    <img
                                        src={data.banner_url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <InputError
                            message={errors.banner_url}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="trailer_url"
                            value="Trailer URL (YouTube/Embed)"
                        />
                        <TextInput
                            id="trailer_url"
                            type="url"
                            className="mt-1 block w-full"
                            value={data.trailer_url}
                            onChange={(e) =>
                                setData("trailer_url", e.target.value)
                            }
                            placeholder="https://youtube.com/..."
                        />
                        <InputError
                            message={errors.trailer_url}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Genres
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {genres.map((genre) => (
                        <label
                            key={genre.id}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                checked={data.genres.includes(genre.id)}
                                onChange={() => handleGenreChange(genre.id)}
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                                {genre.name}
                            </span>
                        </label>
                    ))}
                </div>
                <InputError message={errors.genres} className="mt-2" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Cast & Crew
                    </h3>
                    <SecondaryButton
                        onClick={addPerson}
                        type="button"
                        size="sm"
                    >
                        + Add Person
                    </SecondaryButton>
                </div>
                <div className="space-y-4">
                    {data.persons.map((person, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-4 items-start border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0"
                        >
                            <div className="flex-1 w-full">
                                <InputLabel value="Person" />
                                <PersonSelector
                                    value={person.person_id}
                                    onChange={(id) =>
                                        updatePerson(index, "person_id", id)
                                    }
                                    persons={persons}
                                />
                            </div>
                            <div className="w-full md:w-1/4">
                                <InputLabel value="Role" />
                                <select
                                    className="mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={person.role_type}
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "role_type",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="actor">Actor</option>
                                    <option value="director">Director</option>
                                    <option value="writer">Writer</option>
                                    <option value="producer">Producer</option>
                                </select>
                            </div>
                            {person.role_type === "actor" && (
                                <div className="flex-1 w-full">
                                    <InputLabel value="Character Name" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={person.character_name}
                                        onChange={(e) =>
                                            updatePerson(
                                                index,
                                                "character_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. James Bond"
                                    />
                                </div>
                            )}
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => removePerson(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {data.persons.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                        No cast or crew added yet.
                    </p>
                )}
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Watch Links
                    </h3>
                    <SecondaryButton
                        onClick={addWatchLink}
                        type="button"
                        size="sm"
                    >
                        + Add Link
                    </SecondaryButton>
                </div>
                <div className="space-y-4">
                    {data.watch_links.map((link, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Server Name" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={link.server_name}
                                        onChange={(e) =>
                                            updateWatchLink(
                                                index,
                                                "server_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. VidCloud"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Quality" />
                                    <select
                                        className="mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={link.quality}
                                        onChange={(e) =>
                                            updateWatchLink(
                                                index,
                                                "quality",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="4K">4K</option>
                                        <option value="FHD">1080p</option>
                                        <option value="HD">720p</option>
                                        <option value="SD">480p</option>
                                        <option value="CAM">CAM</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <InputLabel value="Type" />
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="text-indigo-600 focus:ring-indigo-500"
                                            checked={link.type === "url"}
                                            onChange={() =>
                                                updateWatchLink(
                                                    index,
                                                    "type",
                                                    "url"
                                                )
                                            }
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            Direct URL
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="text-indigo-600 focus:ring-indigo-500"
                                            checked={link.type === "embed"}
                                            onChange={() =>
                                                updateWatchLink(
                                                    index,
                                                    "type",
                                                    "embed"
                                                )
                                            }
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            Embed Code
                                        </span>
                                    </label>
                                </div>
                            </div>
                            {link.type === "url" ? (
                                <div>
                                    <InputLabel value="URL" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={link.url}
                                        onChange={(e) =>
                                            updateWatchLink(
                                                index,
                                                "url",
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://..."
                                    />
                                </div>
                            ) : (
                                <div>
                                    <InputLabel value="Embed Code" />
                                    <textarea
                                        className="mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        value={link.embed_code}
                                        onChange={(e) =>
                                            updateWatchLink(
                                                index,
                                                "embed_code",
                                                e.target.value
                                            )
                                        }
                                        placeholder="<iframe>...</iframe>"
                                    ></textarea>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={link.is_vip_only}
                                        onChange={(e) =>
                                            updateWatchLink(
                                                index,
                                                "is_vip_only",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        VIP Only
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => removeWatchLink(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Download Links
                    </h3>
                    <SecondaryButton
                        onClick={addDownloadLink}
                        type="button"
                        size="sm"
                    >
                        + Add Link
                    </SecondaryButton>
                </div>
                <div className="space-y-4">
                    {data.download_links.map((link, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Server Name" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={link.server_name}
                                        onChange={(e) =>
                                            updateDownloadLink(
                                                index,
                                                "server_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Mega"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Quality" />
                                    <select
                                        className="mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={link.quality}
                                        onChange={(e) =>
                                            updateDownloadLink(
                                                index,
                                                "quality",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="4K">4K</option>
                                        <option value="FHD">1080p</option>
                                        <option value="HD">720p</option>
                                        <option value="SD">480p</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <InputLabel value="URL" />
                                <TextInput
                                    className="mt-1 block w-full"
                                    value={link.url}
                                    onChange={(e) =>
                                        updateDownloadLink(
                                            index,
                                            "url",
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="File Size" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={link.file_size}
                                        onChange={(e) =>
                                            updateDownloadLink(
                                                index,
                                                "file_size",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. 1.2 GB"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Format" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={link.file_format}
                                        onChange={(e) =>
                                            updateDownloadLink(
                                                index,
                                                "file_format",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. MKV"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={link.is_vip_only}
                                        onChange={(e) =>
                                            updateDownloadLink(
                                                index,
                                                "is_vip_only",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        VIP Only
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => removeDownloadLink(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stepper Header */}
            <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={` w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                currentStep >= step
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                            }`}
                        >
                            {step}
                        </div>
                        {step < 4 && (
                            <div
                                className={`relative w-16 sm:w-24 h-1 ${
                                    currentStep > step
                                        ? "bg-indigo-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
            </div>

            {/* Footer Actions */}
            <div className="flex gap-3">
                <SecondaryButton
                    onClick={currentStep === 1 ? onClose : prevStep}
                    type="button"
                    disabled={processing}
                >
                    {currentStep === 1 ? "Cancel" : "Previous"}
                </SecondaryButton>

                {currentStep < 4 ? (
                    <PrimaryButton
                        key="next-btn"
                        type="button"
                        onClick={nextStep}
                    >
                        Next
                    </PrimaryButton>
                ) : (
                    <PrimaryButton
                        key="submit-btn"
                        type="submit"
                        disabled={processing}
                        className=" justify-center"
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Saving...
                            </span>
                        ) : movie ? (
                            "Update Movie"
                        ) : (
                            "Create Movie"
                        )}
                    </PrimaryButton>
                )}
            </div>
            {/* TMDB Modal */}
            <Modal
                show={showTmdbModal}
                onClose={() => setShowTmdbModal(false)}
                maxWidth="2xl"
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Search TMDB
                    </h2>
                    <form onSubmit={searchTmdb} className="flex gap-2 mb-4">
                        <TextInput
                            type="text"
                            className="w-full"
                            placeholder="Search for a movie..."
                            value={tmdbQuery}
                            onChange={(e) => setTmdbQuery(e.target.value)}
                        />
                        <PrimaryButton type="submit" disabled={tmdbLoading}>
                            {tmdbLoading ? "Searching..." : "Search"}
                        </PrimaryButton>
                    </form>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {tmdbResults.map((result) => (
                            <div
                                key={result.id}
                                className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer border border-gray-200 dark:border-gray-600"
                                onClick={() => fetchTmdbDetails(result.id)}
                            >
                                {result.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                                        alt={result.title}
                                        className="w-12 h-18 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-12 h-18 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                                        <span className="text-xs">No Img</span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {result.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {result.release_date}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {tmdbResults.length === 0 && !tmdbLoading && (
                            <p className="text-center text-gray-500">
                                No results found.
                            </p>
                        )}
                    </div>
                </div>
            </Modal>
        </form>
    );
}
