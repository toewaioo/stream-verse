<?php

namespace Database\Factories;

use App\Models\DownloadLink;
use App\Models\Movie;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<DownloadLink> */
class DownloadLinkFactory extends Factory
{
    protected $model = DownloadLink::class;

    public function definition()
    {
        $qualities = ['360p', '480p', '720p', '1080p', '4K'];
        $servers = ['Direct Download', 'Google Drive', 'Mega', 'MediaFire', 'Dropbox'];
        $sourceTypes = ['direct', 'torrent', 'magnet'];
        $formats = ['mp4', 'mkv', 'avi', 'webm'];

        return [
            'quality' => $this->faker->randomElement($qualities),
            'server_name' => $this->faker->randomElement($servers),
            'source_type' => $this->faker->randomElement($sourceTypes),
            'url' => $this->faker->url,
            'file_size' => $this->faker->numberBetween(500, 5000) . ' MB',
            'file_format' => $this->faker->randomElement($formats),
            'headers' => $this->faker->optional()->randomElement([
                ['User-Agent' => 'Mozilla/5.0'],
                ['Authorization' => 'Bearer token123']
            ]),
            'requires_proxy' => $this->faker->boolean(20),
            'is_active' => $this->faker->boolean(90),
            'is_vip_only' => $this->faker->boolean(40),
            'priority' => $this->faker->numberBetween(1, 10),
            'success_rate' => $this->faker->numberBetween(50, 100),
            'last_checked_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
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
