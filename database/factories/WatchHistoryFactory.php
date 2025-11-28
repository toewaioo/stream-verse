<?php

namespace Database\Factories;

use App\Models\WatchHistory;
use App\Models\User;
use App\Models\Movie;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<WatchHistory> */
class WatchHistoryFactory extends Factory
{
    protected $model = WatchHistory::class;

    public function definition()
    {
        $duration = $this->faker->numberBetween(1800, 7200); // 30 min to 2 hours
        $position = $this->faker->numberBetween(0, $duration);
        $percent = $duration > 0 ? ($position / $duration) * 100 : 0;

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'last_position_seconds' => $position,
            'duration_seconds' => $duration,
            'percent_watched' => round($percent, 2),
            'completed' => $percent >= 90,
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
