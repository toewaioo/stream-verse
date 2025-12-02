<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

use App\Models\Movie;
use App\Models\Series;
use App\Models\Genre;
use App\Models\Person;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Fetch featured content (5 movies and 5 series)
        // Select only necessary columns to reduce data transfer
        $featuredMovies = Movie::select(['id', 'title', 'slug', 'description', 'poster_url', 'banner_url', 'status'])
            ->where('status', 'released')
            ->whereNotNull('banner_url')
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(function ($movie) {
                $movie->type = 'movie';
                return $movie;
            });

        $featuredSeries = Series::select(['id', 'title', 'slug', 'description', 'poster_url', 'banner_url', 'status'])
            ->where('status', '!=', 'upcoming')

            ->whereNotNull('banner_url')
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(function ($series) {
                $series->type = 'series';
                return $series;
            });

        $featured = $featuredMovies->concat($featuredSeries)->shuffle()->values();

        // Fetch latest movies with genres eager loaded
        $latestMovies = Movie::select(['id', 'title', 'slug', 'poster_url', 'release_date', 'created_at', 'status', 'rating_average'])
            ->where('status', 'released')
            ->with(['genres:id,name,slug'])
            ->orderBy('updated_at', 'desc')
            ->take(9)
            ->get();

        // Fetch latest series with genres eager loaded
        $latestSeries = Series::select(['id', 'title', 'slug', 'poster_url', 'release_year_start', 'created_at', 'status', 'rating_average'])
            ->where('status', '!=', 'upcoming')
            ->with(['genres:id,name,slug'])
            ->orderBy('updated_at', 'desc')
            ->take(9)
            ->get();

        // Fetch genres with counts - optimized with select
        // $genres = Genre::select(['id', 'name', 'slug'])
        //     ->where(function ($query) {
        //         $query->whereHas('movies')
        //             ->orWhereHas('series');
        //     })
        //     ->withCount(['movies', 'series'])
        //     ->orderBy('name')
        //     ->limit(12)
        //     ->get()
        //     ->map(function ($genre) {
        //         $genre->total_count = $genre->movies_count + $genre->series_count;
        //         return $genre;
        //     });

        // // Fetch popular actors - optimized with select
        // $actors = Person::select(['id', 'name', 'avatar_url'])
        //     ->actors()
        //     ->whereHas('roles')
        //     ->withCount('roles')
        //     ->orderBy('roles_count', 'desc')
        //     ->limit(12)
        //     ->get();

        return Inertia::render('Home', [
            'featured' => $featured,
            'latestMovies' => $latestMovies,
            'latestSeries' => $latestSeries,
            // 'genres' => $genres,
            // 'actors' => $actors,
            'seo' => [
                'title' => 'Home',
                'description' => env('APP_DESCRIPTION', 'Your Ultimate Movie & Series Destination - Stream and download the latest movies and TV series'),
                'keywords' => env('APP_KEYWORDS', 'movies, series, streaming, download, cinema, tv shows'),
                'url' => url('/'),
                'image' => $featured->first()?->poster_url ?? url('/images/default-og.jpg'),
                'structuredData' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebSite',
                    'name' => env('APP_NAME', 'Cineverse'),
                    'url' => url('/'),
                    'description' => env('APP_DESCRIPTION', 'Your Ultimate Movie & Series Destination'),
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => url('/search?q={search_term_string}'),
                        'query-input' => 'required name=search_term_string'
                    ]
                ]
            ]
        ]);
    }
    public function search(Request $request): Response
    {
        $query = $request->input('q');

        if (!$query) {
            return Inertia::render('Search', [
                'results' => [],
                'query' => '',
                'seo' => [
                    'title' => 'Search',
                    'description' => 'Search for movies and series',
                ]
            ]);
        }

        // Limit search results and select only necessary columns
        // Use LIKE with index-friendly pattern when possible
        $movies = Movie::select(['id', 'title', 'slug', 'poster_url', 'release_date', 'status'])
            ->where('title', 'like', "%{$query}%")
            ->where('status', 'released')
            ->with(['genres:id,name,slug'])
            ->limit(20)
            ->get()
            ->map(function ($movie) {
                $movie->type = 'movie';
                return $movie;
            });

        $series = Series::select(['id', 'title', 'slug', 'poster_url', 'release_year_start', 'status'])
            ->where('title', 'like', "%{$query}%")
            ->where('status', '!=', 'upcoming')
            ->with(['genres:id,name,slug'])
            ->limit(20)
            ->get()
            ->map(function ($series) {
                $series->type = 'series';
                return $series;
            });

        $results = $movies->concat($series)->values();

        return Inertia::render('Search', [
            'results' => $results,
            'query' => $query,
            'seo' => [
                'title' => "Search results for '{$query}'",
                'description' => "Search results for '{$query}' on Cineverse",
            ]
        ]);
    }
}
