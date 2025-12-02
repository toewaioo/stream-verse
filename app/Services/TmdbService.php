<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TmdbService
{
    protected $baseUrl = 'https://api.themoviedb.org/3';
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.tmdb.api_key') ?? env('TMDB_API_KEY');
    }

    public function searchMovie($query)
    {
        return $this->get('/search/movie', ['query' => $query]);
    }

    public function searchSeries($query)
    {
        return $this->get('/search/tv', ['query' => $query]);
    }

    public function searchPerson($query)
    {
        return $this->get('/search/person', ['query' => $query]);
    }

    public function getMovieDetails($tmdbId)
    {
        $data = $this->get("/movie/{$tmdbId}", [
            'append_to_response' => 'credits,videos,images,release_dates'
        ]);

        if (!$data) return null;

        return $this->mapMovieData($data);
    }

    public function getSeriesDetails($tmdbId)
    {
        $data = $this->get("/tv/{$tmdbId}", [
            'append_to_response' => 'credits,videos,images,external_ids'
        ]);

        if (!$data) return null;

        return $this->mapSeriesData($data);
    }

    public function getPersonDetails($tmdbId)
    {
        $data = $this->get("/person/{$tmdbId}", [
            'append_to_response' => 'images'
        ]);

        if (!$data) return null;

        return $this->mapPersonData($data);
    }

    protected function get($endpoint, $params = [])
    {
        if (!$this->apiKey) {
            Log::error('TMDB API Key is missing.');
            return null;
        }

        $response = Http::get($this->baseUrl . $endpoint, array_merge([
            'api_key' => $this->apiKey,
            'language' => 'en-US',
        ], $params));

        if ($response->successful()) {
            return $response->json();
        }

        Log::error('TMDB API Error: ' . $response->body());
        return null;
    }

    protected function mapMovieData($data)
    {
        $trailer = collect($data['videos']['results'] ?? [])
            ->filter(fn($v) => $v['site'] === 'YouTube' && $v['type'] === 'Trailer')
            ->first();

        $certification = collect($data['release_dates']['results'] ?? [])
            ->where('iso_3166_1', 'US')
            ->flatMap(fn($r) => $r['release_dates'])
            ->first()['certification'] ?? '';

        return [
            'title' => $data['title'],
            'original_title' => $data['original_title'],
            'description' => $data['overview'],
            'release_date' => $data['release_date'],
            'runtime' => $data['runtime'],
            'language' => $data['original_language'],
            'status' => strtolower($data['status']), // Released, Post Production, etc.
            'imdb_id' => $data['imdb_id'] ?? null,
            'budget' => $data['budget'],
            'revenue' => $data['revenue'],
            'poster_url' => $data['poster_path'] ? "https://image.tmdb.org/t/p/w500{$data['poster_path']}" : null,
            'banner_url' => $data['backdrop_path'] ? "https://image.tmdb.org/t/p/original{$data['backdrop_path']}" : null,
            'trailer_url' => $trailer ? "https://www.youtube.com/watch?v={$trailer['key']}" : null,
            'age_rating' => $certification,
            'genres' => collect($data['genres'])->toArray(),
            'cast' => collect($data['credits']['cast'] ?? [])->take(10)->map(fn($c) => [
                'name' => $c['name'],
                'character' => $c['character'],
                'profile_path' => $c['profile_path'] ? "https://image.tmdb.org/t/p/w185{$c['profile_path']}" : null,
            ])->toArray(),
            'crew' => collect($data['credits']['crew'] ?? [])->take(5)->map(fn($c) => [
                'name' => $c['name'],
                'job' => $c['job'],
            ])->toArray(),
        ];
    }

    protected function mapSeriesData($data)
    {
        $trailer = collect($data['videos']['results'] ?? [])
            ->filter(fn($v) => $v['site'] === 'YouTube' && $v['type'] === 'Trailer')
            ->first();

        return [
            'title' => $data['name'],
            'original_title' => $data['original_name'],
            'description' => $data['overview'],
            'release_year_start' => substr($data['first_air_date'], 0, 4),
            'release_year_end' => $data['in_production'] ? null : substr($data['last_air_date'], 0, 4),
            'status' => $data['in_production'] ? 'ongoing' : 'ended',
            'language' => $data['original_language'],
            'country' => $data['origin_country'][0] ?? null,
            'imdb_id' => $data['external_ids']['imdb_id'] ?? null,
            'poster_url' => $data['poster_path'] ? "https://image.tmdb.org/t/p/w500{$data['poster_path']}" : null,
            'banner_url' => $data['backdrop_path'] ? "https://image.tmdb.org/t/p/original{$data['backdrop_path']}" : null,
            'trailer_url' => $trailer ? "https://www.youtube.com/watch?v={$trailer['key']}" : null,
            'genres' => collect($data['genres'])->pluck('name')->toArray(),
            'seasons' => collect($data['seasons'])->map(fn($s) => [
                'season_number' => $s['season_number'],
                'name' => $s['name'],
                'episode_count' => $s['episode_count'],
                'air_date' => $s['air_date'],
                'poster_url' => $s['poster_path'] ? "https://image.tmdb.org/t/p/w500{$s['poster_path']}" : null,
            ])->toArray(),
            'cast' => collect($data['credits']['cast'] ?? [])->take(10)->map(fn($c) => [
                'name' => $c['name'],
                'character' => $c['character'],
                'profile_path' => $c['profile_path'] ? "https://image.tmdb.org/t/p/w185{$c['profile_path']}" : null,
            ])->toArray(),
        ];
    }

    protected function mapPersonData($data)
    {
        return [
            'name' => $data['name'],
            'biography' => $data['biography'],
            'birth_date' => $data['birthday'],
            'death_date' => $data['deathday'],
            'place_of_birth' => $data['place_of_birth'],
            'avatar_url' => $data['profile_path'] ? "https://image.tmdb.org/t/p/w500{$data['profile_path']}" : null,
        ];
    }
}
