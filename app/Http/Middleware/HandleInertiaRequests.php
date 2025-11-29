<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the SSR URL for rendering on the server.
     *
     * @return string|null
     */
    public function ssr(): ?string
    {
        return env('SSR_ENABLED', false)
            ? 'http://127.0.0.1:13714/render'
            : null;
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'footerData' => \Illuminate\Support\Facades\Cache::remember('footer_data', 3600, function () {
                return [
                    'categories' => \App\Models\Genre::whereHas('movies')
                        ->orWhereHas('series')
                        ->withCount(['movies', 'series'])
                        ->orderByDesc('movies_count')
                        ->take(8)
                        ->get()
                        ->map(function ($genre) {
                            return [
                                'id' => $genre->id,
                                'name' => $genre->name,
                                'slug' => $genre->slug,
                                'count' => $genre->movies_count + $genre->series_count,
                            ];
                        }),
                    'actors' => \App\Models\Person::actors()
                        ->withCount(['movies', 'series'])
                        ->orderByDesc('movies_count')
                        ->take(8)
                        ->get()
                        ->map(function ($actor) {
                            return [
                                'id' => $actor->id,
                                'name' => $actor->name,
                                'count' => $actor->movies_count + $actor->series_count,
                            ];
                        }),
                ];
            }),
        ];
    }
}
