<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Person;
use App\Models\Movie;
use App\Models\Episode;
use App\Models\PersonRole;

class ActorSeeder extends Seeder
{
    public function run()
    {
        // Create 50 persons
        $persons = Person::factory()->count(50)->create();

        // Attach actors to MOVIES
        Movie::all()->each(function ($movie) use ($persons) {
            foreach ($persons->random(rand(3, 10)) as $person) {
                PersonRole::factory()
                    ->asActor()
                    ->forMovie($movie->id)
                    ->state(['person_id' => $person->id])
                    ->create();
            }
        });

        // Attach actors to EPISODES
        Episode::all()->each(function ($episode) use ($persons) {
            foreach ($persons->random(rand(2, 6)) as $person) {
                PersonRole::factory()
                    ->asActor()
                    ->forEpisode($episode->id)
                    ->state(['person_id' => $person->id])
                    ->create();
            }
        });
    }
}
