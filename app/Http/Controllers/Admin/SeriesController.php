<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Series;
use App\Models\Genre;
use App\Models\Person;
use App\Models\WatchLink;
use App\Models\DownloadLink;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SeriesController extends Controller
{
    public function index(Request $request)
    {
        $query = Series::query();

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $series = $query->with(['persons', 'genres'])->withCount('seasons')->latest()->paginate(10)->withQueryString();
        return Inertia::render('Admin/Series', [
            'series' => $series,
            'genres' => Genre::all(),
            'persons' => Person::all(),
        ]);
    }

    public function show(Series $series)
    {
        $series->load(['persons', 'genres', 'seasons.episodes.downloadLinks', 'seasons.episodes.watchLinks']);
        return response()->json($series);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:series,slug',
            'original_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'release_year_start' => 'nullable|integer',
            'release_year_end' => 'nullable|integer',
            'status' => 'nullable|string',
            'language' => 'nullable|string',
            'country' => 'nullable|string',
            'imdb_id' => 'nullable|string',
            'poster_url' => 'nullable|string',
            'banner_url' => 'nullable|string',
            'trailer_url' => 'nullable|string',
            'age_rating' => 'nullable|string',
            'is_vip_only' => 'nullable|boolean',
            'rating_average' => 'nullable|numeric',
            'rating_count' => 'nullable|integer',
            'genres' => 'nullable|array',
            'genres.*' => 'exists:genres,id',
            'persons' => 'nullable|array',
            'persons.*.person_id' => 'required|exists:persons,id',
            'persons.*.role_type' => 'required|string',
            'persons.*.character_name' => 'nullable|string',
            'episode_links' => 'nullable|array',
            'episode_links.*.id' => 'nullable',
            'episode_links.*.season_number' => 'required|integer|min:1',
            'episode_links.*.episode_number' => 'required|integer|min:1',
            'episode_links.*.link_category' => 'required|in:watch,download',
            'episode_links.*.server_name' => 'nullable|string',
            'episode_links.*.url' => 'nullable|string',
            'episode_links.*.embed_code' => 'nullable|string',
            'episode_links.*.quality' => 'nullable|string',
            'episode_links.*.file_size' => 'nullable|string',
            'episode_links.*.file_format' => 'nullable|string',
            'episode_links.*.is_vip_only' => 'boolean',
            'episodes_data' => 'nullable|array',
            'episodes_data.*.season_number' => 'required|integer|min:1',
            'episodes_data.*.episode_number' => 'required|integer|min:1',
            'episodes_data.*.description' => 'nullable|string',
            'episodes_data.*.air_date' => 'nullable|date',
            'episodes_data.*.poster_url' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            $series = Series::create($validated);

            if (isset($validated['genres'])) {
                $series->genres()->sync($validated['genres']);
            }

            if (isset($validated['persons'])) {
                foreach ($validated['persons'] as $personData) {
                    $series->persons()->create([
                        'person_id' => $personData['person_id'],
                        'role_type' => $personData['role_type'],
                        'character_name' => $personData['character_name'] ?? null,
                    ]);
                }
            }

            if (isset($validated['episode_links']) || isset($validated['episodes_data'])) {
                $this->syncEpisodeLinks(
                    $series, 
                    $validated['episode_links'] ?? [], 
                    $validated['episodes_data'] ?? []
                );
            }
        });

        return redirect()->back()->with('success', 'Series created successfully.');
    }

    public function update(Request $request, Series $series)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:series,slug,' . $series->id,
            'original_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'release_year_start' => 'nullable|integer',
            'release_year_end' => 'nullable|integer',
            'status' => 'nullable|string',
            'language' => 'nullable|string',
            'country' => 'nullable|string',
            'imdb_id' => 'nullable|string',
            'poster_url' => 'nullable|string',
            'banner_url' => 'nullable|string',
            'trailer_url' => 'nullable|string',
            'age_rating' => 'nullable|string',
            'is_vip_only' => 'nullable|boolean',
            'rating_average' => 'nullable|numeric',
            'rating_count' => 'nullable|integer',
            'genres' => 'nullable|array',
            'genres.*' => 'exists:genres,id',
            'persons' => 'nullable|array',
            'persons.*.person_id' => 'required|exists:persons,id',
            'persons.*.role_type' => 'required|string',
            'persons.*.character_name' => 'nullable|string',
            'episode_links' => 'nullable|array',
            'episode_links.*.id' => 'nullable',
            'episode_links.*.season_number' => 'required|integer|min:1',
            'episode_links.*.episode_number' => 'required|integer|min:1',
            'episode_links.*.link_category' => 'required|in:watch,download',
            'episode_links.*.server_name' => 'nullable|string',
            'episode_links.*.url' => 'nullable|string',
            'episode_links.*.embed_code' => 'nullable|string',
            'episode_links.*.quality' => 'nullable|string',
            'episode_links.*.file_size' => 'nullable|string',
            'episode_links.*.file_format' => 'nullable|string',
            'episode_links.*.is_vip_only' => 'boolean',
            'episodes_data' => 'nullable|array',
            'episodes_data.*.season_number' => 'required|integer|min:1',
            'episodes_data.*.episode_number' => 'required|integer|min:1',
            'episodes_data.*.description' => 'nullable|string',
            'episodes_data.*.air_date' => 'nullable|date',
            'episodes_data.*.poster_url' => 'nullable|string',
        ]);

        DB::transaction(function () use ($series, $validated) {
            $series->update($validated);

            if (isset($validated['genres'])) {
                $series->genres()->sync($validated['genres']);
            }

            if (isset($validated['persons'])) {
                $series->persons()->delete();
                foreach ($validated['persons'] as $personData) {
                    $series->persons()->create([
                        'person_id' => $personData['person_id'],
                        'role_type' => $personData['role_type'],
                        'character_name' => $personData['character_name'] ?? null,
                    ]);
                }
            }

            if (isset($validated['episode_links']) || isset($validated['episodes_data'])) {
                $this->syncEpisodeLinks(
                    $series, 
                    $validated['episode_links'] ?? [], 
                    $validated['episodes_data'] ?? []
                );
            }
        });

        return redirect()->back()->with('success', 'Series updated successfully.');
    }

    public function destroy(Series $series)
    {
        $series->delete();
        return redirect()->back()->with('success', 'Series deleted successfully.');
    }

    private function syncEpisodeLinks(Series $series, array $links, array $episodesMetadata = [])
    {
        // 1. Pre-fetch existing structure to minimize queries
        $series->load('seasons.episodes');
        $existingSeasons = $series->seasons;
        
        // 2. Collect IDs for cleanup
        $submittedWatchIds = [];
        $submittedDownloadIds = [];

        // Group links by season and episode to process efficiently
        $groupedLinks = [];
        foreach ($links as $link) {
            $s = $link['season_number'];
            $e = $link['episode_number'];
            $groupedLinks[$s][$e][] = $link;
        }

        // Group metadata
        $groupedMetadata = [];
        foreach ($episodesMetadata as $meta) {
            $groupedMetadata[$meta['season_number']][$meta['episode_number']] = $meta;
        }

        // Get all unique season/episode pairs
        $allSeasons = array_unique(array_merge(array_keys($groupedLinks), array_keys($groupedMetadata)));

        foreach ($allSeasons as $seasonNum) {
            // Find or Create Season (In-memory check first)
            $season = $existingSeasons->firstWhere('season_number', $seasonNum);
            if (!$season) {
                $season = $series->seasons()->create([
                    'season_number' => $seasonNum,
                    'title' => 'Season ' . $seasonNum
                ]);
                $existingSeasons->push($season);
            }

            $linkEpisodes = $groupedLinks[$seasonNum] ?? [];
            $metaEpisodes = $groupedMetadata[$seasonNum] ?? [];
            $allEpisodes = array_unique(array_merge(array_keys($linkEpisodes), array_keys($metaEpisodes)));

            foreach ($allEpisodes as $episodeNum) {
                // Find or Create Episode
                $episode = $season->episodes->firstWhere('episode_number', $episodeNum);
                if (!$episode) {
                    $episode = $season->episodes()->create([
                        'episode_number' => $episodeNum,
                        'title' => 'Episode ' . $episodeNum
                    ]);
                    $season->episodes->push($episode); // Update in-memory relation
                }

                // Update Metadata
                if (isset($metaEpisodes[$episodeNum])) {
                    $meta = $metaEpisodes[$episodeNum];
                    $episode->update([
                        'description' => $meta['description'] ?? null,
                        'air_date' => $meta['air_date'] ?? null,
                        'poster_url' => $meta['poster_url'] ?? null,
                    ]);
                }

                $episodeLinks = $linkEpisodes[$episodeNum] ?? [];
                foreach ($episodeLinks as $linkData) {
                    // Handle Watch Links
                    if ($linkData['link_category'] === 'watch') {
                        if (empty($linkData['url']) && !empty($linkData['embed_code'])) {
                            $linkData['url'] = 'embed';
                        }
                        if (empty($linkData['url'])) continue;

                        $data = [
                            'server_name' => $linkData['server_name'] ?? null,
                            'url' => $linkData['url'],
                            'embed_code' => $linkData['embed_code'] ?? null,
                            'quality' => $linkData['quality'],
                            'is_vip_only' => $linkData['is_vip_only'] ?? false,
                            'source_type' => !empty($linkData['embed_code']) ? 'embed' : 'url',
                        ];

                        if (isset($linkData['id']) && $linkData['id']) {
                            // Direct update query is fine here as we have the ID
                            WatchLink::where('id', $linkData['id'])->update($data);
                            $submittedWatchIds[] = $linkData['id'];
                        } else {
                            $newLink = $episode->watchLinks()->create($data);
                            $submittedWatchIds[] = $newLink->id;
                        }
                    } 
                    // Handle Download Links
                    else {
                        if (empty($linkData['url'])) continue;

                        $data = [
                            'server_name' => $linkData['server_name'],
                            'url' => $linkData['url'],
                            'quality' => $linkData['quality'],
                            'file_size' => $linkData['file_size'] ?? null,
                            'file_format' => $linkData['file_format'] ?? null,
                            'is_vip_only' => $linkData['is_vip_only'] ?? false,
                        ];

                        if (isset($linkData['id']) && $linkData['id']) {
                            DownloadLink::where('id', $linkData['id'])->update($data);
                            $submittedDownloadIds[] = $linkData['id'];
                        } else {
                            $newLink = $episode->downloadLinks()->create($data);
                            $submittedDownloadIds[] = $newLink->id;
                        }
                    }
                }
            }
        }

        // 3. Cleanup (Delete removed links)
        // We only delete links that belong to the current series' episodes
        // Re-fetch episode IDs to ensure we have all of them (including newly created ones)
        // Actually, we can just use the IDs from the loaded/created models
        $episodeIds = $existingSeasons->flatMap(fn($s) => $s->episodes->pluck('id'));

        if ($episodeIds->isNotEmpty()) {
            WatchLink::whereIn('episode_id', $episodeIds)
                ->whereNotIn('id', $submittedWatchIds)
                ->delete();

            DownloadLink::whereIn('episode_id', $episodeIds)
                ->whereNotIn('id', $submittedDownloadIds)
                ->delete();
        }
    }
    public function checkSlug(Request $request)
    {
        $slug = $request->input('slug');
        $id = $request->input('id');

        $query = Series::where('slug', $slug);
        if ($id) {
            $query->where('id', '!=', $id);
        }

        return response()->json(['exists' => $query->exists()]);
    }
}
