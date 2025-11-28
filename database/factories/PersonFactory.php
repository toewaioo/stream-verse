<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Person;

class PersonFactory extends Factory
{
    protected $model = Person::class;

    public function definition()
    {
        return [
            'name'        => $this->faker->name,
            'biography'   => $this->faker->paragraph,
            'birth_date'  => $this->faker->date(),
            'death_date'  => $this->faker->optional()->date(),
            'gender'      => $this->faker->randomElement(['male', 'female', 'other']),
            'avatar_url'  => "https://placehold.jp/400x600.png?text=" . urlencode($this->faker->words(2, true)),
            'country'     => $this->faker->country,
            'imdb_id'     => 'nm' . $this->faker->numberBetween(1000000, 9999999),
        ];
    }
}
