<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Series;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Fetch featured content (5 movies and 5 series)
        $featuredMovies = Movie::where('status', 'released')
            ->whereNotNull('banner_url')
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(function ($movie) {
                $movie->type = 'movie';
                return $movie;
            });

        $featuredSeries = Series::where('status', '!=', 'upcoming')
            ->whereNotNull('banner_url')
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(function ($series) {
                $series->type = 'series';
                return $series;
            });

        $featured = $featuredMovies->concat($featuredSeries)->shuffle()->values();

        // Fetch latest movies
        $latestMovies = Movie::where('status', 'released')
            ->orderBy('created_at', 'desc')
            ->take(12)
            ->get();

        // Fetch latest series
        $latestSeries = Series::where('status', '!=', 'upcoming')
            ->orderBy('created_at', 'desc')
            ->take(12)
            ->get();

        return Inertia::render('Home', [
            'featured' => $featured,
            'latestMovies' => $latestMovies,
            'latestSeries' => $latestSeries,
        ]);
    }
}
