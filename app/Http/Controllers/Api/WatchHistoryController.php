<?php
// app/Http/Controllers/Api/WatchHistoryController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateWatchHistoryRequest;
use App\Http\Resources\WatchHistoryResource;
use App\Services\WatchHistoryService;
use App\Models\WatchHistory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WatchHistoryController extends Controller
{
    public function __construct(private WatchHistoryService $watchHistoryService) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $history = $this->watchHistoryService->getUserWatchHistory($request->user());

            return response()->json([
                'data' => WatchHistoryResource::collection($history)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch watch history',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function continueWatching(Request $request): JsonResponse
    {
        try {
            $continueWatching = $this->watchHistoryService->getContinueWatching($request->user());

            return response()->json([
                'data' => WatchHistoryResource::collection($continueWatching)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch continue watching',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateProgress(UpdateWatchHistoryRequest $request): JsonResponse
    {
        try {
            $watchHistory = $this->watchHistoryService->updateProgress(
                $request->user(),
                $request->validated()
            );

            return response()->json([
                'message' => 'Progress updated successfully',
                'data' => new WatchHistoryResource($watchHistory)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update progress',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function clearHistory(Request $request): JsonResponse
    {
        try {
            $this->watchHistoryService->clearUserHistory($request->user());

            return response()->json([
                'message' => 'Watch history cleared successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to clear history',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function removeFromHistory(Request $request, int $id): JsonResponse
    {
        try {
            $watchHistory = WatchHistory::where('user_id', $request->user()->id)
                ->findOrFail($id);

            $this->watchHistoryService->removeFromHistory($watchHistory);

            return response()->json([
                'message' => 'Removed from watch history'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to remove from history',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsCompleted(Request $request, int $id): JsonResponse
    {
        try {
            $watchHistory = WatchHistory::where('user_id', $request->user()->id)
                ->findOrFail($id);

            $this->watchHistoryService->markAsCompleted($watchHistory);

            return response()->json([
                'message' => 'Marked as completed',
                'data' => new WatchHistoryResource($watchHistory)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to mark as completed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
