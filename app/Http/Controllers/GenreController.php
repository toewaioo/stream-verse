<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\Series;
use Inertia\Inertia;

class GenreController extends Controller
{
    public function show($slug)
    {
        $genre = Genre::where('slug', $slug)->firstOrFail();

        // Get movies and series for this genre with pagination
        $movies = Movie::whereHas('genres', function ($query) use ($genre) {
            $query->where('genres.id', $genre->id);
        })
            ->with(['genres', 'ratings'])
            ->withAvg('ratings', 'rating')
            ->orderBy('release_date', 'desc')
            ->paginate(18, ['*'], 'movies_page');

        $series = Series::whereHas('genres', function ($query) use ($genre) {
            $query->where('genres.id', $genre->id);
        })
            ->with(['genres', 'ratings'])
            ->withAvg('ratings', 'rating')
            ->orderBy('release_year_start', 'desc')
            ->paginate(18, ['*'], 'series_page');

        return Inertia::render('Genre/Show', [
            'genre' => $genre,
            'movies' => $movies,
            'series' => $series,
            'seo' => [
                'title' => $genre->name . ' - Movies & Series - Cineverse',
                'description' => 'Browse all ' . $genre->name . ' movies and series on Cineverse. Discover the best content in this genre.',
                'keywords' => $genre->name . ', movies, series, streaming, watch online',
            ],
        ]);
    }
}
