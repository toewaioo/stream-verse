<?php

namespace Database\Factories;

use App\Models\Season;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Season> */
class SeasonFactory extends Factory
{
    protected $model = Season::class;

    private static $seasonCounters = [];

    public function definition()
    {
        return [
            'season_number' => 1, // Will be set properly in configure()
            'title' => 'Season ' . $this->faker->numberBetween(1, 10),
            'description' => $this->faker->paragraph,
            'air_date' => $this->faker->date(),
            'episode_count' => 0, // Will be updated after episodes are created
        ];
    }

    /**
     * After creating a season, also create episodes.
     */
    public function configure()
    {
        return $this->afterMaking(function (Season $season) {
            // Ensure sequential season numbers per series
            $seriesId = $season->series_id;
            if (!isset(self::$seasonCounters[$seriesId])) {
                self::$seasonCounters[$seriesId] = 0;
            }
            self::$seasonCounters[$seriesId]++;
            $season->season_number = self::$seasonCounters[$seriesId];
        })->afterCreating(function (Season $season) {
            // Create between 5 and 15 episodes per season with sequential episode numbers
            $episodeCount = $this->faker->numberBetween(5, 15);
            for ($i = 1; $i <= $episodeCount; $i++) {
                Episode::factory()->create([
                    'season_id' => $season->id,
                    'episode_number' => $i,
                ]);
            }

            // Update the episode count
            $season->updateEpisodeCount();
        });
    }
}
