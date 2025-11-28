<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Person;
use App\Models\Movie;
use App\Models\Episode;

class PersonRoleFactory extends Factory
{
    protected $model = \App\Models\PersonRole::class;

    public function definition()
    {
        $roles = ['actor', 'director', 'writer', 'producer', 'composer', 'editor', 'cinematographer'];

        return [
            'person_id'     => Person::factory(),
            'movie_id'      => null,
            'series_id'     => null,
            'season_id'     => null,
            'episode_id'    => null,
            'role_type'     => $this->faker->randomElement($roles),
            'character_name' => $this->faker->name,
            'order_index'   => $this->faker->numberBetween(0, 10),
        ];
    }

    public function forMovie($movieId = null)
    {
        return $this->state(fn() => [
            'movie_id' => $movieId ?? Movie::inRandomOrder()->first()?->id ?? Movie::factory(),
        ]);
    }

    public function forEpisode($episodeId = null)
    {
        return $this->state(fn() => [
            'episode_id' => $episodeId ?? Episode::inRandomOrder()->first()?->id ?? Episode::factory(),
        ]);
    }

    public function asActor()
    {
        return $this->state(fn() => [
            'role_type' => 'actor',
        ]);
    }
}
