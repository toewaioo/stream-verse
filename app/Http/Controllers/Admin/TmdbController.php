<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TmdbService;
use Illuminate\Http\Request;

class TmdbController extends Controller
{
    protected $tmdbService;

    public function __construct(TmdbService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2',
            'type' => 'required|in:movie,series',
        ]);

        $query = $request->input('query');
        $type = $request->input('type');

        if ($type === 'movie') {
            $results = $this->tmdbService->searchMovie($query);
        } else {
            $results = $this->tmdbService->searchSeries($query);
        }

        return response()->json($results);
    }

    public function details(Request $request)
    {
        $request->validate([
            'tmdb_id' => 'required|integer',
            'type' => 'required|in:movie,series',
        ]);

        $tmdbId = $request->input('tmdb_id');
        $type = $request->input('type');

        if ($type === 'movie') {
            $details = $this->tmdbService->getMovieDetails($tmdbId);
        } else {
            $details = $this->tmdbService->getSeriesDetails($tmdbId);
        }

        if (!$details) {
            return response()->json(['message' => 'Failed to fetch details from TMDB'], 500);
        }

        return response()->json($details);
    }
}
