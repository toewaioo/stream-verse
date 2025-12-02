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
            'type' => 'required|in:movie,series,person',
        ]);

        $query = $request->input('query');
        $type = $request->input('type');

        if ($type === 'movie') {
            $results = $this->tmdbService->searchMovie($query);
        } elseif ($type === 'series') {
            $results = $this->tmdbService->searchSeries($query);
        } else {
            $results = $this->tmdbService->searchPerson($query);
        }

        return response()->json($results);
    }

    public function details(Request $request)
    {
        $request->validate([
            'tmdb_id' => 'required|integer',
            'type' => 'required|in:movie,series,person',
        ]);

        $tmdbId = $request->input('tmdb_id');
        $type = $request->input('type');

        if ($type === 'movie') {
            $details = $this->tmdbService->getMovieDetails($tmdbId);
        } elseif ($type === 'series') {
            $details = $this->tmdbService->getSeriesDetails($tmdbId);
        } else {
            $details = $this->tmdbService->getPersonDetails($tmdbId);
        }

        if (!$details) {
            return response()->json(['message' => 'Failed to fetch details from TMDB'], 500);
        }

        return response()->json($details);
    }
}
