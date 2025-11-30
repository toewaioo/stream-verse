<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Movie;
use App\Models\Series;
use Inertia\Inertia;

class PersonController extends Controller
{
    public function show($id)
    {
        $person = Person::findOrFail($id);

        // Get movies featuring this person
        $movies = Movie::where(function ($query) use ($person) {
            $query->whereHas('actors', function ($q) use ($person) {
                $q->where('person_roles.person_id', $person->id);
            })
            ->orWhereHas('directors', function ($q) use ($person) {
                $q->where('person_roles.person_id', $person->id);
            });
        })
            ->with(['genres', 'ratings'])
            ->withAvg('ratings', 'rating')
            ->orderBy('release_date', 'desc')
            ->paginate(18, ['*'], 'movies_page');

        // Get series featuring this person
        $series = Series::where(function ($query) use ($person) {
            $query->whereHas('actors', function ($q) use ($person) {
                $q->where('person_roles.person_id', $person->id);
            })
            ->orWhereHas('directors', function ($q) use ($person) {
                $q->where('person_roles.person_id', $person->id);
            });
        })
            ->with(['genres', 'ratings'])
            ->withAvg('ratings', 'rating')
            ->orderBy('release_year_start', 'desc')
            ->paginate(18, ['*'], 'series_page');

        return Inertia::render('Person/Show', [
            'person' => $person,
            'movies' => $movies,
            'series' => $series,
            'seo' => [
                'title' => $person->name . ' - Movies & Series - Cineverse',
                'description' => 'Browse all movies and series featuring ' . $person->name . ' on Cineverse.',
                'keywords' => $person->name . ', movies, series, actor, director, filmography',
            ],
        ]);
    }
}
