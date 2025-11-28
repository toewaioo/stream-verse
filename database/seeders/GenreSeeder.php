<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            'Action',
            'Adventure',
            'Animation',
            'Comedy',
            'Crime',
            'Documentary',
            'Drama',
            'Fantasy',
            'Horror',
            'Mystery',
            'Romance',
            'Sci-Fi',
            'Thriller',
            'Western',
            'War',
            'Musical',
            'Biography',
            'Family',
            'History',
            'Sport'
        ];

        $genreModels = [];
        foreach ($genres as $genre) {
            $genreModels[] = \App\Models\Genre::create([
                'name' => $genre,
                'slug' => \Illuminate\Support\Str::slug($genre),
            ]);
        }

        // Attach genres to movies and series
        $movies = \App\Models\Movie::all();
        $series = \App\Models\Series::all();

        foreach ($movies as $movie) {
            $selected = (array) array_rand($genreModels, min(3, count($genreModels)));
            $genreIds = array_map(fn($idx) => $genreModels[$idx]->id, $selected);
            $movie->genres()->sync($genreIds);
        }
        foreach ($series as $serie) {
            $selected = (array) array_rand($genreModels, min(3, count($genreModels)));
            $genreIds = array_map(fn($idx) => $genreModels[$idx]->id, $selected);
            $serie->genres()->sync($genreIds);
        }
    }
}
