<?php

namespace Database\Factories;

use App\Models\VipSubscription;
use App\Models\User;
use App\Models\VipKey;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<VipSubscription> */
class VipSubscriptionFactory extends Factory
{
    protected $model = VipSubscription::class;

    public function definition()
    {
        $startDate = $this->faker->dateTimeBetween('-6 months', 'now');
        $durationDays = $this->faker->randomElement([30, 90, 180, 365]);

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'key_id' => VipKey::inRandomOrder()->first()?->id ?? VipKey::factory(),
            'start_date' => $startDate,
            'end_date' => (clone $startDate)->modify("+{$durationDays} days"),
        ];
    }

    public function active()
    {
        return $this->state(function (array $attributes) {
            $startDate = now()->subDays($this->faker->numberBetween(1, 30));
            $durationDays = $this->faker->randomElement([30, 90, 180, 365]);

            return [
                'start_date' => $startDate,
                'end_date' => (clone $startDate)->modify("+{$durationDays} days"),
            ];
        });
    }

    public function expired()
    {
        return $this->state(function (array $attributes) {
            $startDate = $this->faker->dateTimeBetween('-1 year', '-2 months');
            $durationDays = 30;

            return [
                'start_date' => $startDate,
                'end_date' => (clone $startDate)->modify("+{$durationDays} days"),
            ];
        });
    }
}
