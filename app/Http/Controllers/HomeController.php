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
        // Fetch featured content (e.g., a random high-rated movie)
        $featured = Movie::where('status', 'released')
            ->whereNotNull('banner_url')
            ->inRandomOrder()
            ->first();

        // Fallback if no movie found
        if (!$featured) {
            $featured = Series::where('status', '!=', 'upcoming')
                ->whereNotNull('banner_url')
                ->inRandomOrder()
                ->first();
        }

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
