<?php

namespace Database\Factories;

use App\Models\VipKey;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<VipKey> */
class VipKeyFactory extends Factory
{
    protected $model = VipKey::class;

    public function definition()
    {
        return [
            'key' => strtoupper(Str::random(16)),
            'duration_days' => $this->faker->randomElement([30, 90, 180, 365]),
            'is_active' => $this->faker->boolean(80),
            'max_uses' => $this->faker->optional(0.5)->numberBetween(1, 100),
            'uses_count' => 0,
            'expires_at' => $this->faker->optional(0.3)->dateTimeBetween('now', '+1 year'),
        ];
    }

    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => true,
                'expires_at' => $this->faker->dateTimeBetween('+1 month', '+1 year'),
            ];
        });
    }

    public function expired()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
                'expires_at' => $this->faker->dateTimeBetween('-1 year', '-1 day'),
            ];
        });
    }
}
