<?php

namespace App\Http\Controllers;

use App\Models\Series;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class SeriesController extends Controller
{
    /**
     * Display a listing of series.
     */
    public function index(): Response
    {
        $series = Series::where('visibility_status', 'public')
            ->where('status', '!=', 'upcoming')
            ->orderBy('release_year_start', 'desc')
            ->paginate(10);

        return Inertia::render('Series/Index', [
            'series' => $series,
        ]);
    }

    /**
     * Display the series details page
     */
    public function show(string $slug): Response
    {
        $query = Series::where('slug', $slug)
            ->with([
                'genres',
                'persons.person',
                'seasons' => function ($query) {
                    $query->orderBy('season_number');
                },
                'seasons.episodes' => function ($query) {
                    $query->orderBy('episode_number');
                }
            ]);

        if (Auth::check()) {
            $query->with([
                'seasons.episodes.watchLinks' => function ($query) {
                    $query->active()->orderBy('priority', 'desc');
                },
                'seasons.episodes.downloadLinks' => function ($query) {
                    $query->active()->orderBy('priority', 'desc');
                }
            ]);
        }

        $series = $query->firstOrFail();

        // Increment view count
        $series->incrementViewCount();

        // Get related series based on shared genres
        $relatedSeries = Series::whereHas('genres', function ($query) use ($series) {
            $query->whereIn('genres.id', $series->genres->pluck('id'));
        })
            ->where('id', '!=', $series->id)
            ->where('status', '!=', 'upcoming') // Example filter
            ->with(['genres'])
            ->inRandomOrder()
            ->limit(6)
            ->get();

        // Separate actors, directors, and writers
        $actors = $series->persons->where('role_type', 'actor')->values();
        $directors = $series->persons->where('role_type', 'director')->values();
        $writers = $series->persons->where('role_type', 'writer')->values();

        // Get user's rating if authenticated
        $userRating = null;
        if (Auth::check()) {
            // Placeholder for series rating logic if implemented
        }

        return Inertia::render('SeriesDetails', [
            'series' => [
                'id' => $series->id,
                'title' => $series->title,
                'original_title' => $series->original_title,
                'slug' => $series->slug,
                'description' => $series->description,
                'release_year_start' => $series->release_year_start,
                'release_year_end' => $series->release_year_end,
                'status' => $series->status,
                'language' => $series->language,
                'country' => $series->country,
                'imdb_id' => $series->imdb_id,
                'poster_url' => $series->poster_url,
                'banner_url' => $series->banner_url,
                'trailer_url' => $series->trailer_url,
                'rating_average' => (float) $series->rating_average,
                'rating_count' => $series->rating_count,
                'age_rating' => $series->age_rating,
                'is_vip_only' => $series->is_vip_only,
                'view_count' => $series->view_count,
                'genres' => $series->genres,
                'seasons' => $series->seasons,
                'actors' => $actors,
                'directors' => $directors,
                'writers' => $writers,
            ],
            'relatedSeries' => $relatedSeries,
            'userRating' => $userRating,
            'isVip' => false, // Placeholder
        ]);
    }
}
