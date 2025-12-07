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

    /**
     * @OA\Get(
     *      path="/api/watch-history",
     *      operationId="getWatchHistory",
     *      tags={"Watch History"},
     *      summary="Get user's watch history",
     *      description="Returns the user's watch history",
     *      security={ {"sanctum": {} } },
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/WatchHistoryResource")
     *          )
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

    /**
     * @OA\Get(
     *      path="/api/watch-history/continue-watching",
     *      operationId="getContinueWatching",
     *      tags={"Watch History"},
     *      summary="Get user's continue watching list",
     *      description="Returns the user's continue watching list",
     *      security={ {"sanctum": {} } },
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/WatchHistoryResource")
     *          )
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Post(
     *      path="/api/watch-history/progress",
     *      operationId="updateProgress",
     *      tags={"Watch History"},
     *      summary="Update watch progress",
     *      description="Updates the watch progress for a movie or episode",
     *      security={ {"sanctum": {} } },
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateWatchHistoryRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/WatchHistoryResource")
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Post(
     *      path="/api/watch-history/clear",
     *      operationId="clearHistory",
     *      tags={"Watch History"},
     *      summary="Clear watch history",
     *      description="Clears the user's watch history",
     *      security={ {"sanctum": {} } },
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Delete(
     *      path="/api/watch-history/{id}",
     *      operationId="removeFromHistory",
     *      tags={"Watch History"},
     *      summary="Remove from watch history",
     *      description="Removes an item from the user's watch history",
     *      security={ {"sanctum": {} } },
     *      @OA\Parameter(
     *          name="id",
     *          description="Watch history ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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

    /**
     * @OA\Post(
     *      path="/api/watch-history/{id}/complete",
     *      operationId="markAsCompleted",
     *      tags={"Watch History"},
     *      summary="Mark as completed",
     *      description="Marks an item in the watch history as completed",
     *      security={ {"sanctum": {} } },
     *      @OA\Parameter(
     *          name="id",
     *          description="Watch history ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/WatchHistoryResource")
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error"
     *      )
     * )
     */
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
