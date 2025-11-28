<?php

namespace Database\Factories;

use App\Models\Series;
use App\Models\Season;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Series> */
class SeriesFactory extends Factory
{
    protected $model = Series::class;

    public function definition()
    {
        $title = $this->faker->sentence(3);
        $startYear = $this->faker->year;
        $endYear = $this->faker->optional()->year;
        return [
            'title' => $title,
            'original_title' => $this->faker->sentence(3),
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1, 10000),
            'description' => $this->faker->paragraph,
            'release_year_start' => $startYear,
            'release_year_end' => $endYear,
            'status' => $this->faker->randomElement(['ongoing', 'upcoming', 'ended']),
            'language' => $this->faker->languageCode,
            'country' => $this->faker->country,
            'imdb_id' => 'tt' . $this->faker->unique()->numerify('######'),
            'poster_url' => "https://placehold.jp/400x600.png?text=" . urlencode($this->faker->words(2, true)),
            'banner_url' => "https://placehold.jp/1280x720.png?text=" . urlencode($this->faker->words(2, true)),
            'trailer_url' => $this->faker->url,
            'age_rating' => $this->faker->randomElement(['G', 'PG', 'PG-13', 'R', '18+']),
            'is_vip_only' => $this->faker->boolean(20),
            'rating_average' => $this->faker->randomFloat(1, 0, 10),
            'rating_count' => $this->faker->numberBetween(0, 500),
        ];
    }

    /**
     * After creating a series, also create seasons and episodes.
     */
    public function configure()
    {
        return $this->afterCreating(function (Series $series) {
            // Create between 1 and 5 seasons per series
            $seasonCount = $this->faker->numberBetween(1, 5);
            Season::factory()->count($seasonCount)->create(['series_id' => $series->id]);
        });
    }
}
