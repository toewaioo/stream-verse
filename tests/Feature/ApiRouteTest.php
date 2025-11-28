<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Movie;
use App\Models\Series;
use App\Models\Season;
use App\Models\Episode;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiRouteTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $movie;
    private $series;
    private $season;
    private $episode;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->movie = Movie::create([
            'title' => 'Test Movie',
            'slug' => 'test-movie',
            'description' => 'Test Description',
            'release_date' => '2023-01-01',
            'runtime' => 120,
            'visibility_status' => 'public',
            'status' => 'released'
        ]);

        $this->series = Series::create([
            'title' => 'Test Series',
            'slug' => 'test-series',
            'description' => 'Test Series Description',
            'release_date' => '2023-01-01',
            'visibility_status' => 'public',
            'status' => 'ongoing'
        ]);

        $this->season = $this->series->seasons()->create([
            'season_number' => 1,
            'title' => 'Season 1',
            'release_date' => '2023-01-01'
        ]);

        $this->episode = $this->season->episodes()->create([
            'episode_number' => 1,
            'title' => 'Episode 1',
            'runtime' => 60,
            'release_date' => '2023-01-01'
        ]);
    }

    public function test_public_movie_routes()
    {
        $this->getJson('/api/movies/trending')->assertStatus(200);
        $this->getJson('/api/movies')->assertStatus(200);
        $this->getJson('/api/movies/' . $this->movie->slug)->assertStatus(200);
        $this->getJson('/api/movies/' . $this->movie->slug . '/related')->assertStatus(200);
    }

    public function test_public_series_routes()
    {
        $this->getJson('/api/series/trending')->assertStatus(200);
        $this->getJson('/api/series')->assertStatus(200);
        $this->getJson('/api/series/' . $this->series->slug)->assertStatus(200);
        $this->getJson('/api/series/' . $this->series->slug . '/seasons/' . $this->season->season_number)->assertStatus(200);
        $this->getJson('/api/series/' . $this->series->slug . '/seasons/' . $this->season->season_number . '/episodes/' . $this->episode->episode_number)->assertStatus(200);
    }

    public function test_search_routes()
    {
        $this->getJson('/api/movies/search?q=Test')->assertStatus(200);
        $this->getJson('/api/series/search?q=Test')->assertStatus(200);
    }

    public function test_protected_routes_require_auth()
    {
        $this->getJson('/api/user')->assertStatus(401);
        $this->postJson('/api/logout')->assertStatus(401);
        
        // Streaming routes are protected
        $this->getJson('/api/movies/' . $this->movie->slug . '/stream')->assertStatus(401);
    }

    public function test_protected_routes_with_auth()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/user');
        
        $response->assertStatus(200);
    }

    public function test_login_route()
    {
        $response = $this->postJson('/api/login', [
            'email' => $this->user->email,
            'password' => 'password', // Default password for factory
        ]);

        $response->assertStatus(200);
        $this->assertArrayHasKey('token', $response->json());
    }
}
