import React, { useState, useMemo, useEffect } from "react";
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

export default function SeriesForm({
    series,
    genres = [],
    persons = [],
    onClose,
    onSuccess,
}) {
    const [currentStep, setCurrentStep] = useState(1);

    // Helper to transform flat links to hierarchical structure
    const getInitialEpisodeLinks = () => {
        if (!series?.seasons) return [];
        const links = [];
        series.seasons.forEach((season) => {
            season.episodes?.forEach((episode) => {
                episode.watch_links?.forEach((link) => {
                    links.push({
                        id: link.id,
                        season_number: season.season_number,
                        episode_number: episode.episode_number,
                        link_category: "watch",
                        server_name: link.server_name,
                        quality: link.quality,
                        type: link.type || (link.embed_code ? "embed" : "url"),
                        url: link.url || "",
                        embed_code: link.embed_code || "",
                        is_vip_only: Boolean(link.is_vip_only),
                        file_size: "",
                        file_format: "",
                    });
                });
                episode.download_links?.forEach((link) => {
                    links.push({
                        id: link.id,
                        season_number: season.season_number,
                        episode_number: episode.episode_number,
                        link_category: "download",
                        server_name: link.server_name,
                        quality: link.quality,
                        type: "url",
                        url: link.url || "",
                        embed_code: "",
                        is_vip_only: Boolean(link.is_vip_only),
                        file_size: link.file_size || "",
                        file_format: link.file_format || "",
                    });
                });
            });
        });
        return links;
    };

    const getInitialEpisodeMetadata = () => {
        if (!series?.seasons) return [];
        const metadata = [];
        series.seasons.forEach((season) => {
            season.episodes?.forEach((episode) => {
                metadata.push({
                    season_number: season.season_number,
                    episode_number: episode.episode_number,
                    description: episode.description || "",
                    air_date: episode.air_date || "",
                    poster_url: episode.poster_url || "",
                });
            });
        });
        return metadata;
    };

    const { data, setData, post, put, processing, errors } = useForm({
        title: series?.title || "",
        slug: series?.slug || "",
        original_title: series?.original_title || "",
        description: series?.description || "",
        release_year_start: series?.release_year_start || "",
        release_year_end: series?.release_year_end || "",
        status: series?.status || "ongoing",
        language: series?.language || "en",
        country: series?.country || "",
        age_rating: series?.age_rating || "",
        is_vip_only: series?.is_vip_only || false,
        poster_url: series?.poster_url || "",
        banner_url: series?.banner_url || "",
        trailer_url: series?.trailer_url || "",
        imdb_id: series?.imdb_id || "",
        genres: series?.genres?.map((g) => g.id) || [],
        persons:
            series?.persons?.map((p) => ({
                person_id: p.person_id,
                role_type: p.role_type,
                character_name: p.character_name,
            })) || [],
        episode_links: getInitialEpisodeLinks(),
        episodes_data: getInitialEpisodeMetadata(),
    });

    const storageKey = series?.id
        ? `series_form_update_${series.id}`
        : "series_form_create";
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
            const response = await axios.post(route('admin.tmdb.search'), {
                query: tmdbQuery,
                type: 'series'
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
            const response = await axios.post(route('admin.tmdb.details'), {
                tmdb_id: tmdbId,
                type: 'series'
            });
            const details = response.data;

            // Map TMDB data to form
            setData(prev => ({
                ...prev,
                title: details.title,
                original_title: details.original_title,
                description: details.description,
                release_year_start: details.release_year_start,
                release_year_end: details.release_year_end || "",
                status: details.status,
                language: details.language,
                country: details.country,
                poster_url: details.poster_url,
                banner_url: details.banner_url,
                trailer_url: details.trailer_url,
                imdb_id: details.imdb_id,
                // Note: Genres and Persons mapping would require more complex logic
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
    useEffect(() => {
        if (data.title && !series?.id) {
            const slug = data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            setData("slug", slug);
        }
    }, [data.title]);

    // Realtime slug check
    useEffect(() => {
        const checkSlug = async () => {
            if (!data.slug) return;

            try {
                const response = await axios.get(
                    route("admin.series.check-slug"),
                    {
                        params: {
                            slug: data.slug,
                            id: series?.id,
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
    }, [data.slug, series?.id]);

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

    // --- Hierarchical Episode Link Management ---

    // Derived state for hierarchical view
    const hierarchy = useMemo(() => {
        const tree = {};
        data.episode_links.forEach((link, index) => {
            const s = link.season_number || 0;
            const e = link.episode_number || 0;
            if (!tree[s]) tree[s] = {};
            if (!tree[s][e]) tree[s][e] = [];
            tree[s][e].push({ ...link, originalIndex: index });
        });

        // Ensure episodes with only metadata also appear in the tree
        data.episodes_data.forEach((meta) => {
            const s = meta.season_number || 0;
            const e = meta.episode_number || 0;
            if (!tree[s]) tree[s] = {};
            if (!tree[s][e]) tree[s][e] = tree[s][e] || [];
        });

        return tree;
    }, [data.episode_links, data.episodes_data]);

    const updateEpisodeMetadata = (seasonNum, episodeNum, field, value) => {
        const newMetadata = [...data.episodes_data];
        const index = newMetadata.findIndex(
            (m) =>
                m.season_number === seasonNum && m.episode_number === episodeNum
        );

        if (index > -1) {
            newMetadata[index][field] = value;
        } else {
            // Create new entry
            newMetadata.push({
                season_number: seasonNum,
                episode_number: episodeNum,
                description: "",
                air_date: "",
                poster_url: "",
                [field]: value,
            });
        }
        setData("episodes_data", newMetadata);
    };
    const [expandedSeasons, setExpandedSeasons] = useState({});
    const [expandedEpisodes, setExpandedEpisodes] = useState({});
    const toggleSeason = (s) =>
        setExpandedSeasons((prev) => ({ ...prev, [s]: !prev[s] }));

    const toggleEpisode = (s, e) =>
        setExpandedEpisodes((prev) => ({
            ...prev,
            [`${s}-${e}`]: !prev[`${s}-${e}`],
        }));

    const addLinkToEpisode = (seasonNum, episodeNum) => {
        setData("episode_links", [
            ...data.episode_links,
            {
                season_number: seasonNum,
                episode_number: episodeNum,
                link_category: "watch",
                server_name: "",
                url: "",
                embed_code: "",
                quality: "HD",
                type: "url",
                file_format: "MKV",
                file_size: "",
                is_vip_only: false,
            },
        ]);
        // Auto expand
        setExpandedSeasons((prev) => ({ ...prev, [seasonNum]: true }));

        setExpandedEpisodes((prev) => ({
            ...prev,
            [`${seasonNum}-${episodeNum}`]: true,
        }));
    };

    const removeLink = (originalIndex) => {
        const newLinks = [...data.episode_links];
        newLinks.splice(originalIndex, 1);
        setData("episode_links", newLinks);
    };

    const updateLink = (originalIndex, field, value) => {
        const newLinks = [...data.episode_links];
        newLinks[originalIndex][field] = value;
        setData("episode_links", newLinks);
    };

    // New Season/Episode inputs
    const [newSeasonNum, setNewSeasonNum] = useState("");
    const [newEpisodeNum, setNewEpisodeNum] = useState("");

    const handleAddNewLocation = () => {
        if (newSeasonNum && newEpisodeNum) {
            addLinkToEpisode(parseInt(newSeasonNum), parseInt(newEpisodeNum));
            setNewSeasonNum("");
            setNewEpisodeNum("");
        }
    };

    // --- End Hierarchical Management ---

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                clearStorage();
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            },
        };

        if (series && series.id) {
            put(route("admin.series.update", series.id), options);
        } else {
            post(route("admin.series.store"), options);
        }
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                            <InputLabel htmlFor="title" value="Series Title" />
                            <SecondaryButton size="sm" onClick={() => setShowTmdbModal(true)} type="button">
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
                            placeholder="e.g. Breaking Bad"
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
                            placeholder="e.g. breaking-bad"
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
                            placeholder="tt0903747"
                        />
                        <InputError message={errors.imdb_id} className="mt-2" />
                    </div>

                    <div className="md:col-span-2">
                        <InputLabel htmlFor="description" value="Synopsis" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                            rows="4"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Enter a detailed description of the series..."
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Genres
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {genres.map((genre) => (
                        <label
                            key={genre.id}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
        </div>
    );
    const renderStep2 = () => (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Details & Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <select
                        id="status"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="ended">Ended</option>
                        <option value="canceled">Canceled</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="release_year_start"
                            value="Start Year"
                        />
                        <TextInput
                            id="release_year_start"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.release_year_start}
                            onChange={(e) =>
                                setData("release_year_start", e.target.value)
                            }
                            placeholder="2008"
                        />
                        <InputError
                            message={errors.release_year_start}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="release_year_end"
                            value="End Year"
                        />
                        <TextInput
                            id="release_year_end"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.release_year_end}
                            onChange={(e) =>
                                setData("release_year_end", e.target.value)
                            }
                            placeholder="2013"
                        />
                        <InputError
                            message={errors.release_year_end}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="language" value="Language" />
                    <TextInput
                        id="language"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.language}
                        onChange={(e) => setData("language", e.target.value)}
                        placeholder="en"
                    />
                    <InputError message={errors.language} className="mt-2" />
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
                    <InputLabel htmlFor="age_rating" value="Age Rating" />
                    <select
                        id="age_rating"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                        value={data.age_rating}
                        onChange={(e) => setData("age_rating", e.target.value)}
                    >
                        <option value="G">Select Rating</option>
                        <option value="G">G - General Audiences</option>
                        <option value="PG">PG - Parental Guidance</option>
                        <option value="PG-13">PG-13</option>
                        <option value="18+">18+</option>
                        <option value="R">R - Restricted</option>
                    </select>
                    <InputError message={errors.age_rating} className="mt-2" />
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
                            <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
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
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                                <div className="flex-shrink-0 h-10 w-8 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600">
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
                                <div className="flex-shrink-0 h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600">
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

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
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
                                    className="mt-1 block w-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
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
                                        placeholder="e.g. Walter White"
                                    />
                                </div>
                            )}
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => removePerson(index)}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        No cast or crew added yet.
                    </p>
                )}
            </div>
        </div>
    );

    // --- Tabbed Interface State ---
    // Initialize active season to the last season (if editing) or 1 (if creating)
    const getInitialActiveSeason = () => {
        if (series?.seasons && series.seasons.length > 0) {
            const lastSeason = Math.max(
                ...series.seasons.map((s) => s.season_number)
            );
            return lastSeason;
        }
        return 1;
    };

    const [activeSeasonTab, setActiveSeasonTab] = useState(getInitialActiveSeason());

    // Initialize active tab when hierarchy changes if needed
    useEffect(() => {
        const seasons = Object.keys(hierarchy)
            .map(Number)
            .sort((a, b) => a - b);

        if (seasons.length > 0) {
            // If current active tab doesn't exist in hierarchy, set to last season
            if (!seasons.includes(activeSeasonTab)) {
                setActiveSeasonTab(seasons[seasons.length - 1]);
            }
        } else {
            setActiveSeasonTab(1);
        }
    }, [hierarchy]);

    const handleAddSeason = () => {
        const seasons = Object.keys(hierarchy).map(Number);
        const nextSeason = seasons.length > 0 ? Math.max(...seasons) + 1 : 1;
        setActiveSeasonTab(nextSeason);
    };

    const handleAddEpisodeToActiveSeason = () => {
        const episodes = hierarchy[activeSeasonTab]
            ? Object.keys(hierarchy[activeSeasonTab]).map(Number)
            : [];
        const nextEpisode = episodes.length > 0 ? Math.max(...episodes) + 1 : 1;

        // Add a placeholder link to create the episode entry
        addLinkToEpisode(activeSeasonTab, nextEpisode);
    };

    const renderStep4 = () => {
        const seasons = Object.keys(hierarchy)
            .map(Number)
            .sort((a, b) => a - b);
        const activeEpisodes = hierarchy[activeSeasonTab]
            ? Object.keys(hierarchy[activeSeasonTab])
                .map(Number)
                .sort((a, b) => a - b)
            : [];

        return (
            <div className="space-y-6 pb-20">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                Episode Manager
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Manage seasons, episodes, and streaming links.
                            </p>
                        </div>
                        <SecondaryButton
                            onClick={handleAddSeason}
                            className="w-full sm:w-auto justify-center"
                        >
                            + Add Season
                        </SecondaryButton>
                    </div>

                    {/* Season Tabs */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex overflow-x-auto gap-3 pb-2 custom-scrollbar snap-x">
                            {seasons
                                .slice()
                                .reverse()
                                .map((season) => (
                                    <button
                                        key={season}
                                        type="button"
                                        onClick={() =>
                                            setActiveSeasonTab(season)
                                        }
                                        className={`flex-shrink-0 snap-start px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeSeasonTab === season
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-800"
                                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md"
                                            }`}
                                    >
                                        Season {season}
                                    </button>
                                ))}

                            {!seasons.includes(activeSeasonTab) && (
                                <button
                                    type="button"
                                    className="flex-shrink-0 px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-800"
                                >
                                    Season {activeSeasonTab} (New)
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Season Content */}
                    <div className="p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800 min-h-[400px]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                Season {activeSeasonTab}
                                <span className="text-gray-500 dark:text-gray-400 font-normal text-sm ml-2">
                                    ({activeEpisodes.length} Episodes)
                                </span>
                            </h4>

                            <PrimaryButton
                                onClick={handleAddEpisodeToActiveSeason}
                                type="button"
                                className="w-full sm:w-auto justify-center"
                            >
                                + Add Episode{" "}
                                {activeEpisodes.length > 0
                                    ? Math.max(...activeEpisodes) + 1
                                    : 1}
                            </PrimaryButton>
                        </div>

                        {/* No Episodes */}
                        {activeEpisodes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-8 h-8 text-gray-400 dark:text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>

                                <h5 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                                    No episodes yet
                                </h5>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                                    Add the first episode to Season{" "}
                                    {activeSeasonTab}.
                                </p>

                                <PrimaryButton
                                    onClick={handleAddEpisodeToActiveSeason}
                                    type="button"
                                >
                                    Create Episode 1
                                </PrimaryButton>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activeEpisodes
                                    .slice()
                                    .reverse()
                                    .map((episodeNum) => (
                                        <div
                                            key={episodeNum}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
                                        >
                                            {/* EP Header */}
                                            <div
                                                className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50"
                                                onClick={() =>
                                                    toggleEpisode(
                                                        activeSeasonTab,
                                                        episodeNum
                                                    )
                                                }
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                                        {episodeNum}
                                                    </div>

                                                    <div>
                                                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                                                            Episode {episodeNum}
                                                        </h5>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {
                                                                hierarchy[
                                                                    activeSeasonTab
                                                                ][episodeNum]
                                                                    .length
                                                            }{" "}
                                                            Links
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`p-2 rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-400 transition-transform duration-200 ${expandedEpisodes[
                                                        `${activeSeasonTab}-${episodeNum}`
                                                    ]
                                                        ? "rotate-180 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400"
                                                        : ""
                                                        }`}
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
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* EP Content */}
                                            {expandedEpisodes[
                                                `${activeSeasonTab}-${episodeNum}`
                                            ] && (
                                                    <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-4 space-y-6">
                                                        {/* EP Metadata */}
                                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                                                            <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                                Episode Details
                                                            </h6>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="md:col-span-2">
                                                                    <InputLabel value="Description" />
                                                                    <textarea
                                                                        className="mt-1 block w-full text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                                                        rows="2"
                                                                        value={
                                                                            data.episodes_data.find(
                                                                                (
                                                                                    m
                                                                                ) =>
                                                                                    m.season_number ===
                                                                                    activeSeasonTab &&
                                                                                    m.episode_number ===
                                                                                    episodeNum
                                                                            )
                                                                                ?.description ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateEpisodeMetadata(
                                                                                activeSeasonTab,
                                                                                episodeNum,
                                                                                "description",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    ></textarea>
                                                                </div>

                                                                <div>
                                                                    <InputLabel value="Air Date" />
                                                                    <TextInput
                                                                        type="date"
                                                                        className="mt-1 block w-full text-sm"
                                                                        value={
                                                                            data.episodes_data.find(
                                                                                (
                                                                                    m
                                                                                ) =>
                                                                                    m.season_number ===
                                                                                    activeSeasonTab &&
                                                                                    m.episode_number ===
                                                                                    episodeNum
                                                                            )
                                                                                ?.air_date ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateEpisodeMetadata(
                                                                                activeSeasonTab,
                                                                                episodeNum,
                                                                                "air_date",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <InputLabel value="Poster URL" />
                                                                    <div className="flex gap-2">
                                                                        <TextInput
                                                                            type="url"
                                                                            className="mt-1 block w-full text-sm"
                                                                            value={
                                                                                data.episodes_data.find(
                                                                                    (
                                                                                        m
                                                                                    ) =>
                                                                                        m.season_number ===
                                                                                        activeSeasonTab &&
                                                                                        m.episode_number ===
                                                                                        episodeNum
                                                                                )
                                                                                    ?.poster_url ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateEpisodeMetadata(
                                                                                    activeSeasonTab,
                                                                                    episodeNum,
                                                                                    "poster_url",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="https://..."
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Links List */}
                                                        <div className="space-y-4">
                                                            <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                                Streaming & Download
                                                                Links
                                                            </h6>

                                                            {hierarchy[
                                                                activeSeasonTab
                                                            ][episodeNum].map(
                                                                (link) => (
                                                                    <div
                                                                        key={
                                                                            link.originalIndex
                                                                        }
                                                                        className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm relative"
                                                                    >
                                                                        {/* category row */}
                                                                        <div className="flex justify-between items-start mb-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <span
                                                                                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${link.link_category ===
                                                                                        "watch"
                                                                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                                                                        : "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                                                                        }`}
                                                                                >
                                                                                    {link.link_category ===
                                                                                        "watch"
                                                                                        ? "Stream"
                                                                                        : "Download"}
                                                                                </span>

                                                                                {link.server_name && (
                                                                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                                                                                        {
                                                                                            link.server_name
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                            </div>

                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    removeLink(
                                                                                        link.originalIndex
                                                                                    )
                                                                                }
                                                                                className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
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
                                                                                        strokeWidth={
                                                                                            2
                                                                                        }
                                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                    />
                                                                                </svg>
                                                                            </button>
                                                                        </div>

                                                                        {/* Link fields */}
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                                            <div>
                                                                                <InputLabel value="Category" />
                                                                                <select
                                                                                    className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                                                    value={
                                                                                        link.link_category
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        updateLink(
                                                                                            link.originalIndex,
                                                                                            "link_category",
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <option value="watch">
                                                                                        Stream
                                                                                    </option>
                                                                                    <option value="download">
                                                                                        Download
                                                                                    </option>
                                                                                </select>
                                                                            </div>

                                                                            <div>
                                                                                <InputLabel value="Server Name" />
                                                                                <TextInput
                                                                                    className="w-full text-sm"
                                                                                    value={
                                                                                        link.server_name
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        updateLink(
                                                                                            link.originalIndex,
                                                                                            "server_name",
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    placeholder="VidCloud"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {/* WATCH or DOWNLOAD forms */}
                                                                        {link.link_category ===
                                                                            "watch" ? (
                                                                            <div className="space-y-3">
                                                                                <div className="flex gap-4 p-1 bg-gray-50 dark:bg-gray-900/50 rounded-lg w-fit">
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            updateLink(
                                                                                                link.originalIndex,
                                                                                                "type",
                                                                                                "url"
                                                                                            )
                                                                                        }
                                                                                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${link.type ===
                                                                                            "url"
                                                                                            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                                                                            : "text-gray-500 dark:text-gray-400"
                                                                                            }`}
                                                                                    >
                                                                                        Direct
                                                                                        URL
                                                                                    </button>

                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            updateLink(
                                                                                                link.originalIndex,
                                                                                                "type",
                                                                                                "embed"
                                                                                            )
                                                                                        }
                                                                                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${link.type ===
                                                                                            "embed"
                                                                                            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                                                                            : "text-gray-500 dark:text-gray-400"
                                                                                            }`}
                                                                                    >
                                                                                        Embed
                                                                                        Code
                                                                                    </button>
                                                                                </div>

                                                                                {link.type ===
                                                                                    "url" ? (
                                                                                    <TextInput
                                                                                        className="w-full text-sm font-mono"
                                                                                        value={
                                                                                            link.url
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            updateLink(
                                                                                                link.originalIndex,
                                                                                                "url",
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <textarea
                                                                                        className="w-full text-sm font-mono rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                                                                                        rows="3"
                                                                                        value={
                                                                                            link.embed_code
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            updateLink(
                                                                                                link.originalIndex,
                                                                                                "embed_code",
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }
                                                                                    ></textarea>
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="space-y-4">
                                                                                <div>
                                                                                    <InputLabel value="Download URL" />
                                                                                    <TextInput
                                                                                        className="w-full text-sm font-mono"
                                                                                        value={
                                                                                            link.url
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            updateLink(
                                                                                                link.originalIndex,
                                                                                                "url",
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>

                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                    <div>
                                                                                        <InputLabel value="Quality" />
                                                                                        <TextInput
                                                                                            className="w-full text-sm"
                                                                                            value={
                                                                                                link.quality
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                updateLink(
                                                                                                    link.originalIndex,
                                                                                                    "quality",
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div>
                                                                                        <InputLabel value="Format" />
                                                                                        <TextInput
                                                                                            className="w-full text-sm"
                                                                                            value={
                                                                                                link.file_format
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                updateLink(
                                                                                                    link.originalIndex,
                                                                                                    "file_format",
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}

                                                            {/* Add Link */}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    addLinkToEpisode(
                                                                        activeSeasonTab,
                                                                        episodeNum
                                                                    )
                                                                }
                                                                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400"
                                                            >
                                                                + Add Another Link
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="p-6">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex justify-between items-center sticky bottom-0 z-10">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${step === currentStep
                                ? "bg-blue-600 dark:bg-blue-500"
                                : "bg-gray-300 dark:bg-gray-800"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex gap-3">

                    <SecondaryButton
                        onClick={currentStep === 1 ? onClose : prevStep}
                        type="button"
                        disabled={processing}
                    >
                        {currentStep === 1 ? "Cancel" : "Previous"}
                    </SecondaryButton>
                    {currentStep < 4 ? (
                        <PrimaryButton onClick={nextStep}>Next</PrimaryButton>
                    ) : (
                        <PrimaryButton
                            onClick={handleSubmit}
                            disabled={processing}
                        >
                            {series ? "Update Series" : "Create Series"}
                        </PrimaryButton>
                    )}
                </div>
            </div>
            {/* TMDB Modal */}
            <Modal show={showTmdbModal} onClose={() => setShowTmdbModal(false)} maxWidth="2xl">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Search TMDB
                    </h2>
                    <form onSubmit={searchTmdb} className="flex gap-2 mb-4">
                        <TextInput
                            type="text"
                            className="w-full"
                            placeholder="Search for a series..."
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
                                        alt={result.name}
                                        className="w-12 h-18 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-12 h-18 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                                        <span className="text-xs">No Img</span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {result.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {result.first_air_date}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {tmdbResults.length === 0 && !tmdbLoading && (
                            <p className="text-center text-gray-500">No results found.</p>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}