<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DownloadLink;
use App\Models\Movie;
use App\Models\Episode;
use App\Models\WatchLink;

class DownloadLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // DownloadLink::factory()->count(20)->forMovie()->create();
        // For MOVIES
        Movie::all()->each(function ($movie) {
            WatchLink::factory()
                ->count(5) // how many links per movie
                ->forMovie() // use factory state
                ->state(['movie_id' => $movie->id]) // ensure correct movie
                ->create();
            DownloadLink::factory()
                ->count(5) // how many links per movie
                ->forMovie() // use factory state
                ->state(['movie_id' => $movie->id]) // ensure correct movie
                ->create();
        });

        // For EPISODES
        Episode::all()->each(function ($episode) {
            WatchLink::factory()
                ->count(5) // how many links per movie
                ->forEpisode() // use factory state
                ->state(['episode_id' => $episode->id]) // ensure correct movie
                ->create();
            DownloadLink::factory()
                ->count(3) // how many links per episode
                ->forEpisode()
                ->state(['episode_id' => $episode->id])
                ->create();
        });
    }
}
