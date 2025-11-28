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
