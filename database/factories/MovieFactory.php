<?php

namespace Database\Factories;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Movie> */
class MovieFactory extends Factory
{
    protected $model = Movie::class;

    public function definition()
    {
        $title = $this->faker->sentence(3);
        return [
            'title' => $title,
            'original_title' => $this->faker->sentence(3),
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1, 10000),
            'description' => $this->faker->paragraph,
            'release_date' => $this->faker->date(),
            'runtime' => $this->faker->numberBetween(80, 180),
            'language' => $this->faker->languageCode,
            'country' => $this->faker->country,
            'imdb_id' => 'tt' . $this->faker->unique()->numerify('######'),
            'budget' => $this->faker->numberBetween(1000000, 200000000),
            'revenue' => $this->faker->numberBetween(1000000, 500000000),
            'trailer_url' => $this->faker->url,
            'poster_url' => "https://placehold.jp/400x600.png?text=" . urlencode($this->faker->words(2, true)),
            'banner_url' => "https://placehold.jp/1280x720.png?text=" . urlencode($this->faker->words(2, true)),
            'rating_average' => $this->faker->randomFloat(1, 0, 10),
            'rating_count' => $this->faker->numberBetween(0, 1000),
            'age_rating' => $this->faker->randomElement(['G', 'PG', 'PG-13', 'R', '18+']),
            'is_vip_only' => $this->faker->boolean(20),
            'visibility_status' => $this->faker->randomElement(['public', 'private', 'coming_soon']),
            'status' => $this->faker->randomElement(['released', 'upcoming', 'canceled']),
        ];
    }
}
