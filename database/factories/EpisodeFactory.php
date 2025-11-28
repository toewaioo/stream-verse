<?php

namespace Database\Factories;

use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Episode> */
class EpisodeFactory extends Factory
{
    protected $model = Episode::class;

    public function definition()
    {
        return [
            'episode_number' => $this->faker->numberBetween(1, 20),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'runtime' => $this->faker->numberBetween(20, 60), // minutes
            'air_date' => $this->faker->date(),
            'view_count' => $this->faker->numberBetween(0, 10000),
            'poster_url' =>"https://placehold.jp/400x600.png?text=" . urlencode($this->faker->words(2, true)),
            'trailer_url' => $this->faker->url,
            'imdb_id' => 'tt' . $this->faker->unique()->numerify('######'),
            'rating_average' => $this->faker->randomFloat(1, 0, 10),
            'rating_count' => $this->faker->numberBetween(0, 500),
        ];
    }
}
