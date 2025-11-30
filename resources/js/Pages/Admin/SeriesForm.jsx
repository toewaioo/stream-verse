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
    });

    const storageKey = series?.id ? `series_form_update_${series.id}` : "series_form_create";
    const { clearStorage } = useFormPersistence(storageKey, data, setData);

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
                const response = await axios.get(route('admin.series.check-slug'), {
                    params: {
                        slug: data.slug,
                        id: series?.id
                    }
                });

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
        return tree;
    }, [data.episode_links]);

    const [expandedSeasons, setExpandedSeasons] = useState({});
    const [expandedEpisodes, setExpandedEpisodes] = useState({});

    const toggleSeason = (s) => setExpandedSeasons(prev => ({ ...prev, [s]: !prev[s] }));
    const toggleEpisode = (s, e) => setExpandedEpisodes(prev => ({ ...prev, [`${s}-${e}`]: !prev[`${s}-${e}`] }));

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
        setExpandedSeasons(prev => ({ ...prev, [seasonNum]: true }));
        setExpandedEpisodes(prev => ({ ...prev, [`${seasonNum}-${episodeNum}`]: true }));
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

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="title" value="Series Title" />
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
                        <InputLabel htmlFor="original_title" value="Original Title" />
                        <TextInput
                            id="original_title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.original_title}
                            onChange={(e) => setData("original_title", e.target.value)}
                            placeholder="Original language title"
                        />
                        <InputError message={errors.original_title} className="mt-2" />
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
                        <InputError message={errors.slug || slugError} className="mt-2" />
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
                            className="mt-1 block w-full text-black border-gray-300 dark:border-gray-300 dark:bg-gray-300 dark:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="4"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Enter a detailed description of the series..."
                        ></textarea>
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Details & Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                            <InputLabel htmlFor="release_year_start" value="Start Year" />
                            <TextInput
                                id="release_year_start"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.release_year_start}
                                onChange={(e) => setData("release_year_start", e.target.value)}
                                placeholder="2008"
                            />
                            <InputError message={errors.release_year_start} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="release_year_end" value="End Year" />
                            <TextInput
                                id="release_year_end"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.release_year_end}
                                onChange={(e) => setData("release_year_end", e.target.value)}
                                placeholder="2013"
                            />
                            <InputError message={errors.release_year_end} className="mt-2" />
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
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.age_rating}
                            onChange={(e) => setData("age_rating", e.target.value)}
                        >
                            <option value="">Select Rating</option>
                            <option value="G">G - General Audiences</option>
                            <option value="PG">PG - Parental Guidance</option>
                            <option value="PG-13">PG-13</option>
                            <option value="TV-14">TV-14</option>
                            <option value="TV-MA">TV-MA - Mature</option>
                            <option value="R">R - Restricted</option>
                        </select>
                        <InputError message={errors.age_rating} className="mt-2" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                            <Checkbox
                                name="is_vip_only"
                                checked={data.is_vip_only}
                                onChange={(e) => setData("is_vip_only", e.target.checked)}
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

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                                onChange={(e) => setData("poster_url", e.target.value)}
                                placeholder="https://..."
                            />
                            {data.poster_url && (
                                <div className="flex-shrink-0 h-10 w-8 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                    <img src={data.poster_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <InputError message={errors.poster_url} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="banner_url" value="Banner/Backdrop URL" />
                        <div className="flex gap-4">
                            <TextInput
                                id="banner_url"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.banner_url}
                                onChange={(e) => setData("banner_url", e.target.value)}
                                placeholder="https://..."
                            />
                            {data.banner_url && (
                                <div className="flex-shrink-0 h-10 w-16 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                    <img src={data.banner_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <InputError message={errors.banner_url} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="trailer_url" value="Trailer URL (YouTube/Embed)" />
                        <TextInput
                            id="trailer_url"
                            type="url"
                            className="mt-1 block w-full"
                            value={data.trailer_url}
                            onChange={(e) => setData("trailer_url", e.target.value)}
                            placeholder="https://youtube.com/..."
                        />
                        <InputError message={errors.trailer_url} className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Genres
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {genres.map((genre) => (
                        <label key={genre.id} className="flex items-center space-x-2">
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
                    <SecondaryButton onClick={addPerson} type="button" size="sm">
                        + Add Person
                    </SecondaryButton>
                </div>
                <div className="space-y-4">
                    {data.persons.map((person, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 items-start border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                            <div className="flex-1 w-full">
                                <InputLabel value="Person" />
                                <PersonSelector
                                    value={person.person_id}
                                    onChange={(id) => updatePerson(index, "person_id", id)}
                                    persons={persons}
                                />
                            </div>
                            <div className="w-full md:w-1/4">
                                <InputLabel value="Role" />
                                <select
                                    className="mt-1 block w-full text-gray-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={person.role_type}
                                    onChange={(e) => updatePerson(index, "role_type", e.target.value)}
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
                                        onChange={(e) => updatePerson(index, "character_name", e.target.value)}
                                        placeholder="e.g. Walter White"
                                    />
                                </div>
                            )}
                            <div className="mt-6">
                                <button type="button" onClick={() => removePerson(index)} className="text-red-500 hover:text-red-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Episode Links Manager
                </h3>

                {/* Add New Episode Section */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add Links for New or Existing Episode</h4>
                    <div className="flex gap-4 items-end">
                        <div className="w-24">
                            <InputLabel value="Season #" />
                            <TextInput
                                type="number"
                                className="mt-1 block w-full"
                                value={newSeasonNum}
                                onChange={(e) => setNewSeasonNum(e.target.value)}
                                placeholder="1"
                            />
                        </div>
                        <div className="w-24">
                            <InputLabel value="Episode #" />
                            <TextInput
                                type="number"
                                className="mt-1 block w-full"
                                value={newEpisodeNum}
                                onChange={(e) => setNewEpisodeNum(e.target.value)}
                                placeholder="1"
                            />
                        </div>
                        <SecondaryButton
                            type="button"
                            onClick={handleAddNewLocation}
                            disabled={!newSeasonNum || !newEpisodeNum}
                        >
                            + Add Link
                        </SecondaryButton>
                    </div>
                </div>

                {/* Hierarchical List */}
                <div className="space-y-4">
                    {Object.keys(hierarchy).sort((a, b) => Number(a) - Number(b)).map(seasonNum => (
                        <div key={seasonNum} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div
                                className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                onClick={() => toggleSeason(seasonNum)}
                            >
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">Season {seasonNum}</h4>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    {Object.keys(hierarchy[seasonNum]).length} Episodes
                                </span>
                            </div>

                            {expandedSeasons[seasonNum] && (
                                <div className="bg-white dark:bg-gray-800 p-4 space-y-4">
                                    {Object.keys(hierarchy[seasonNum]).sort((a, b) => Number(a) - Number(b)).map(episodeNum => (
                                        <div key={episodeNum} className="border border-gray-100 dark:border-gray-700 rounded-lg">
                                            <div
                                                className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                onClick={() => toggleEpisode(seasonNum, episodeNum)}
                                            >
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Episode {episodeNum}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">{hierarchy[seasonNum][episodeNum].length} Links</span>
                                                    <SecondaryButton
                                                        size="sm"
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addLinkToEpisode(parseInt(seasonNum), parseInt(episodeNum));
                                                        }}
                                                    >
                                                        + Link
                                                    </SecondaryButton>
                                                </div>
                                            </div>

                                            {expandedEpisodes[`${seasonNum}-${episodeNum}`] && (
                                                <div className="p-4 space-y-4">
                                                    {hierarchy[seasonNum][episodeNum].map((link) => (
                                                        <div key={link.originalIndex} className="p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900/50 relative group">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeLink(link.originalIndex)}
                                                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                                                                <div>
                                                                    <InputLabel value="Category" className="text-xs" />
                                                                    <select
                                                                        className="mt-1 block w-full text-sm py-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded"
                                                                        value={link.link_category}
                                                                        onChange={(e) => updateLink(link.originalIndex, "link_category", e.target.value)}
                                                                    >
                                                                        <option value="watch">Watch</option>
                                                                        <option value="download">Download</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <InputLabel value="Server" className="text-xs" />
                                                                    <TextInput
                                                                        className="mt-1 block w-full text-sm py-1"
                                                                        value={link.server_name}
                                                                        onChange={(e) => updateLink(link.originalIndex, "server_name", e.target.value)}
                                                                        placeholder="Server Name"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {link.link_category === 'watch' ? (
                                                                <div className="space-y-2">
                                                                    <div className="flex gap-4">
                                                                        <label className="flex items-center text-xs">
                                                                            <input
                                                                                type="radio"
                                                                                className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                                                                                checked={link.type === "url"}
                                                                                onChange={() => updateLink(link.originalIndex, "type", "url")}
                                                                            />
                                                                            <span className="ml-1 text-gray-600 dark:text-gray-400">URL</span>
                                                                        </label>
                                                                        <label className="flex items-center text-xs">
                                                                            <input
                                                                                type="radio"
                                                                                className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                                                                                checked={link.type === "embed"}
                                                                                onChange={() => updateLink(link.originalIndex, "type", "embed")}
                                                                            />
                                                                            <span className="ml-1 text-gray-600 dark:text-gray-400">Embed</span>
                                                                        </label>
                                                                    </div>
                                                                    {link.type === 'url' ? (
                                                                        <TextInput
                                                                            className="block w-full text-sm py-1"
                                                                            value={link.url}
                                                                            onChange={(e) => updateLink(link.originalIndex, "url", e.target.value)}
                                                                            placeholder="https://..."
                                                                        />
                                                                    ) : (
                                                                        <textarea
                                                                            className="block w-full text-sm py-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded"
                                                                            rows="2"
                                                                            value={link.embed_code}
                                                                            onChange={(e) => updateLink(link.originalIndex, "embed_code", e.target.value)}
                                                                            placeholder="<iframe>...</iframe>"
                                                                        ></textarea>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <TextInput
                                                                        className="block w-full text-sm py-1"
                                                                        value={link.url}
                                                                        onChange={(e) => updateLink(link.originalIndex, "url", e.target.value)}
                                                                        placeholder="Download URL"
                                                                    />
                                                                    <TextInput
                                                                        className="block w-full text-sm py-1"
                                                                        value={link.quality}
                                                                        onChange={(e) => updateLink(link.originalIndex, "quality", e.target.value)}
                                                                        placeholder="Quality (e.g. 1080p)"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {data.episode_links.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No episode links added yet. Use the form above to add one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="p-6">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center sticky bottom-0 z-10">
                <div className="flex gap-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${step === currentStep
                                ? "bg-indigo-600"
                                : "bg-gray-300 dark:bg-gray-600"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex gap-3">
                    {currentStep > 1 && (
                        <SecondaryButton onClick={prevStep} disabled={processing}>
                            Back
                        </SecondaryButton>
                    )}
                    {currentStep < 3 ? (
                        <PrimaryButton onClick={nextStep}>Next</PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={handleSubmit} disabled={processing}>
                            {series ? "Update Series" : "Create Series"}
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </div>
    );
}
