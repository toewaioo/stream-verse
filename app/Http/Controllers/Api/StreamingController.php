<?php
// app/Http/Controllers/Api/StreamingController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StreamContentRequest;
use App\Services\StreamingService;
use App\Services\StreamProxyService;
use App\Models\Movie;
use App\Models\Episode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\Log;

class StreamingController extends Controller
{
    public function __construct(
        private StreamingService $streamingService,
        private StreamProxyService $proxyService
    ) {}

    public function getMovieStreamingLinks(StreamContentRequest $request, string $movieSlug): JsonResponse
    {
        try {
            $movie = Movie::where('slug', $movieSlug)->firstOrFail();

            //$this->authorize('stream', $movie);

            $links = $this->streamingService->getStreamingLinks(
                $movie,
                $request->user(),
                $request->quality
            );

            return response()->json([
                'data' => $links,
                'movie' => [
                    'title' => $movie->title,
                    'duration' => $movie->runtime,
                    'formatted_runtime' => $movie->formatted_runtime,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch streaming links',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getEpisodeStreamingLinks(Request $request, string $seriesSlug, int $seasonNumber, int $episodeNumber): JsonResponse
    {
        try {
            $episode = Episode::whereHas('season.series', function ($query) use ($seriesSlug) {
                $query->where('slug', $seriesSlug);
            })
                ->whereHas('season', function ($query) use ($seasonNumber) {
                    $query->where('season_number', $seasonNumber);
                })
                ->where('episode_number', $episodeNumber)
                ->firstOrFail();

            //$this->authorize('stream', $episode->series);

            $links = $this->streamingService->getStreamingLinks(
                $episode,
                $request->user(),
                $request->quality
            );

            return response()->json([
                'data' => $links,
                'episode' => [
                    'title' => $episode->title,
                    'full_title' => $episode->full_title,
                    'series' => $episode->season->series->title,
                    'season' => $episode->season->season_number,
                    'episode' => $episode->episode_number,
                    'runtime' => $episode->runtime,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch streaming links',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function proxyStream(Request $request, int $linkId): ?StreamedResponse
    {
        try {
            $range = $request->header('Range');

            $response = $this->proxyService->proxyStream($linkId, $range);

            if (!$response) {
                abort(404, 'Stream not found');
            }

            return $response;
        } catch (\Exception $e) {
            abort(500, 'Stream proxy error');
        }
    }

    public function getDownloadLinks(Request $request, string $type, string $slug): JsonResponse
    {
        try {
            $user = $request->user();

            if ($type === 'movie') {
                $content = Movie::where('slug', $slug)->firstOrFail();
                //$this->authorize('stream', $content);
                $links = $this->streamingService->getDownloadLinks($content, $user, $request->quality);
            } else {
                $content = Episode::whereHas('season.series', function ($query) use ($slug) {
                    $query->where('slug', $slug);
                })->firstOrFail();
                //$this->authorize('stream', $content->series);
                $links = $this->streamingService->getDownloadLinks($content, $user, $request->quality);
            }

            $directUrls = $links->map(function ($link) {
                return [
                    'id' => $link['id'],
                    'direct_url' => $this->proxyService->getDirectDownloadUrl($link['id']),
                    'quality' => $link['quality'],
                    'file_size' => $link['file_size'],
                    'file_format' => $link['file_format'],
                ];
            })->filter();

            return response()->json([
                'data' => $links,
                'direct_download_urls' => $directUrls
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch download links',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function reportBrokenLink(Request $request, int $linkId): JsonResponse
    {
        try {
            $link = \App\Models\WatchLink::findOrFail($linkId);

            // Immediately mark as failed
            $link->markAsFailed();

            // Log the report
            Log::warning("User reported broken link", [
                'user_id' => $request->user()->id,
                'link_id' => $linkId,
                'url' => $link->url,
            ]);

            return response()->json([
                'message' => 'Link reported as broken. Thank you for your feedback.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to report broken link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAlternativeLinks(Request $request, int $linkId): JsonResponse
    {
        try {
            $currentLink = \App\Models\WatchLink::findOrFail($linkId);
            $content = $currentLink->content;
            $user = $request->user();

            $alternatives = $this->streamingService->getAlternativeLinks(
                $content,
                $currentLink->server_name,
                $user
            );

            return response()->json([
                'data' => $alternatives
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch alternative links',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
