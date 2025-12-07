<?php
// app/Http/Controllers/Api/SeriesController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeriesResource;
use App\Http\Resources\SeriesCollection;
use App\Http\Resources\SeasonResource;
use App\Http\Resources\EpisodeResource;
use App\Services\SeriesService;
use App\Models\Series;
use App\Models\Season;
use App\Models\Episode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
    public function __construct(private SeriesService $seriesService) {}

    /**
     * @OA\Get(
     *      path="/api/series",
     *      operationId="getSeriesList",
     *      tags={"Series"},
     *      summary="Get list of series",
     *      description="Returns list of series",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/SeriesCollection")
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $series = $this->seriesService->getAllSeries($request->all());

            return response()->json(new SeriesCollection($series));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch series',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/series/{slug}",
     *      operationId="getSeriesBySlug",
     *      tags={"Series"},
     *      summary="Get a series by slug",
     *      description="Returns a single series",
     *      @OA\Parameter(
     *          name="slug",
     *          description="Series slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/SeriesResource")
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Series not found"
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
            $series = $this->seriesService->getSeriesBySlug($slug);

            if (!$series) {
                return response()->json([
                    'message' => 'Series not found'
                ], 404);
            }

            //$this->authorize('view', $series);

            return response()->json([
                'data' => new SeriesResource($series->load([
                    'genres',
                    'seasons.episodes',
                    'actors.person',
                    'directors.person'
                ]))
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch series',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/series/{seriesSlug}/seasons/{seasonNumber}",
     *      operationId="getSeason",
     *      tags={"Series"},
     *      summary="Get a season of a series",
     *      description="Returns a single season",
     *      @OA\Parameter(
     *          name="seriesSlug",
     *          description="Series slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="seasonNumber",
     *          description="Season number",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/SeasonResource")
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Season not found"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
    public function season(string $seriesSlug, int $seasonNumber): JsonResponse
    {
        try {
            $season = $this->seriesService->getSeason($seriesSlug, $seasonNumber);

            if (!$season) {
                return response()->json([
                    'message' => 'Season not found'
                ], 404);
            }

            //$this->authorize('view', $season->series);

            return response()->json([
                'data' => new SeasonResource($season->load(['episodes', 'series']))
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch season',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/series/{seriesSlug}/seasons/{seasonNumber}/episodes/{episodeNumber}",
     *      operationId="getEpisode",
     *      tags={"Series"},
     *      summary="Get an episode of a series",
     *      description="Returns a single episode",
     *      @OA\Parameter(
     *          name="seriesSlug",
     *          description="Series slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="seasonNumber",
     *          description="Season number",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="episodeNumber",
     *          description="Episode number",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/EpisodeResource")
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Episode not found"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
    public function episode(string $seriesSlug, int $seasonNumber, int $episodeNumber): JsonResponse
    {
        try {
            $episode = $this->seriesService->getEpisode($seriesSlug, $seasonNumber, $episodeNumber);

            if (!$episode) {
                return response()->json([
                    'message' => 'Episode not found'
                ], 404);
            }

            //$this->authorize('view', $episode->series);

            // Track view
            $this->seriesService->trackEpisodeView($episode);

            return response()->json([
                'data' => new EpisodeResource($episode->load([
                    'season.series',
                    'actors.person',
                    'directors.person',
                    'ratings'
                ]))
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch episode',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/series/trending",
     *      operationId="getTrendingSeries",
     *      tags={"Series"},
     *      summary="Get trending series",
     *      description="Returns a list of trending series",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/SeriesResource")
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
            $series = $this->seriesService->getTrendingSeries();

            return response()->json([
                'data' => SeriesResource::collection($series)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch trending series',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/series/search",
     *      operationId="searchSeries",
     *      tags={"Series"},
     *      summary="Search for series",
     *      description="Returns a list of series matching the search query",
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
     *          @OA\JsonContent(ref="#/components/schemas/SeriesCollection")
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

            $series = $this->seriesService->searchSeries($query, $request->all());

            return response()->json(new SeriesCollection($series));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Search failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
