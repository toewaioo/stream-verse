<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        // $this->call([

        //     \Database\Seeders\MovieSeeder::class,
        //     \Database\Seeders\SeriesSeeder::class,
        //     \Database\Seeders\GenreSeeder::class,
        //     \Database\Seeders\WatchLinkSeeder::class,
        //     \Database\Seeders\DownloadLinkSeeder::class,
        //     \Database\Seeders\RatingSeeder::class,
        //     \Database\Seeders\WatchHistorySeeder::class,
        //     \Database\Seeders\VipKeySeeder::class,
        //     \Database\Seeders\VipSubscriptionSeeder::class,
        //     \Database\Seeders\ActorSeeder::class,
        // ]);
    }
}
