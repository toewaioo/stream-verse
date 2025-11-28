<?php
// app/Http/Controllers/Api/MovieController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MovieResource;
use App\Http\Resources\MovieCollection;
use App\Services\MovieService;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __construct(private MovieService $movieService) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $movies = $this->movieService->getMovies($request->all());

            return response()->json(new MovieCollection($movies));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch movies',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $slug): JsonResponse
    {
        try {
            $movie = $this->movieService->getMovieBySlug($slug);

            if (!$movie) {
                return response()->json([
                    'message' => 'Movie not found'
                ], 404);
            }

            // Check authorization
           // $this->authorize('view', $movie);

            // Track view
            $this->movieService->trackView($movie);

            return response()->json([
                'data' => new MovieResource($movie->load([
                    'genres',
                    'actors.person',
                    'directors.person',
                    'writers.person',
                    'ratings' => function ($query) {
                        $query->latest()->limit(10);
                    }
                ]))
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch movie',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function trending(): JsonResponse
    {
        try {
            $movies = $this->movieService->getTrendingMovies();

            return response()->json([
                'data' => MovieResource::collection($movies)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch trending movies',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request): JsonResponse
    {
        try {
            $query = $request->get('q');

            if (!$query || strlen($query) < 2) {
                return response()->json([
                    'message' => 'Search query must be at least 2 characters long'
                ], 422);
            }

            $movies = $this->movieService->searchMovies($query, $request->all());

            return response()->json(new MovieCollection($movies));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Search failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function related(string $slug): JsonResponse
    {
        try {
            $movie = $this->movieService->getMovieBySlug($slug);

            if (!$movie) {
                return response()->json([
                    'message' => 'Movie not found'
                ], 404);
            }

            $relatedMovies = $this->movieService->getRelatedMovies($movie);

            return response()->json([
                'data' => MovieResource::collection($relatedMovies)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch related movies',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function byGenre(string $genreSlug, Request $request): JsonResponse
    {
        try {
            $filters = array_merge($request->all(), ['genre' => $genreSlug]);
            $movies = $this->movieService->getMovies($filters);

            return response()->json(new MovieCollection($movies));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch movies by genre',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
