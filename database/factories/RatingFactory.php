<?php

namespace Database\Factories;

use App\Models\Rating;
use App\Models\User;
use App\Models\Movie;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Rating> */
class RatingFactory extends Factory
{
    protected $model = Rating::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'rating' => $this->faker->numberBetween(1, 10),
            'review_text' => $this->faker->optional(0.6)->paragraph,
            'spoiler_flag' => $this->faker->boolean(10),
        ];
    }

    public function forMovie()
    {
        return $this->state(function (array $attributes) {
            return [
                'movie_id' => Movie::inRandomOrder()->first()?->id ?? Movie::factory(),
                'episode_id' => null,
            ];
        });
    }

    public function forEpisode()
    {
        return $this->state(function (array $attributes) {
            return [
                'movie_id' => null,
                'episode_id' => Episode::inRandomOrder()->first()?->id ?? Episode::factory(),
            ];
        });
    }
}
