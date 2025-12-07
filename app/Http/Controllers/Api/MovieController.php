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

    /**
     * @OA\Get(
     *      path="/api/movies",
     *      operationId="getMoviesList",
     *      tags={"Movies"},
     *      summary="Get list of movies",
     *      description="Returns list of movies",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/MovieCollection")
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     *     )
     */
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

    /**
     * @OA\Get(
     *      path="/api/movies/{slug}",
     *      operationId="getMovieBySlug",
     *      tags={"Movies"},
     *      summary="Get a movie by slug",
     *      description="Returns a single movie",
     *      @OA\Parameter(
     *          name="slug",
     *          description="Movie slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/MovieResource")
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Movie not found"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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
                    'person',
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

    /**
     * @OA\Get(
     *      path="/api/movies/trending",
     *      operationId="getTrendingMovies",
     *      tags={"Movies"},
     *      summary="Get trending movies",
     *      description="Returns a list of trending movies",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/MovieResource")
     *          )
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/movies/search",
     *      operationId="searchMovies",
     *      tags={"Movies"},
     *      summary="Search for movies",
     *      description="Returns a list of movies matching the search query",
     *      @OA\Parameter(
     *          name="q",
     *          description="Search query",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/MovieCollection")
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/movies/{slug}/related",
     *      operationId="getRelatedMovies",
     *      tags={"Movies"},
     *      summary="Get related movies",
     *      description="Returns a list of related movies",
     *      @OA\Parameter(
     *          name="slug",
     *          description="Movie slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/MovieResource")
     *          )
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Movie not found"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/movies/genre/{genreSlug}",
     *      operationId="getMoviesByGenre",
     *      tags={"Movies"},
     *      summary="Get movies by genre",
     *      description="Returns a list of movies in a specific genre",
     *      @OA\Parameter(
     *          name="genreSlug",
     *          description="Genre slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/MovieCollection")
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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
