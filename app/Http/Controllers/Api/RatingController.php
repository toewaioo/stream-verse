<?php
// app/Http/Controllers/Api/RatingController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRatingRequest;
use App\Http\Requests\UpdateRatingRequest;
use App\Http\Resources\MovieResource;
use App\Http\Resources\RatingResource;
use App\Http\Resources\SeriesResource;
use App\Services\RatingService;
use App\Models\Movie;
use App\Models\Rating;
use App\Models\Series;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function __construct(private RatingService $ratingService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $ratings = $this->ratingService->getUserRatings($request->user());

            return response()->json([
                'data' => RatingResource::collection($ratings)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch ratings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreRatingRequest $request): JsonResponse
    {
        try {
            $rating = $this->ratingService->createRating($request->user(), $request->validated());
            $content = null;
            if ($rating->movie_id) {
                $content = Movie::find($rating->movie_id);
            } elseif ($rating->series_id) {
                $content = Series::find($rating->series_id);
            }

            return response()->json([
                'message' => 'Rating submitted successfully',
                'rating' => new RatingResource($rating),
                'content' => $content ? ($content instanceof Movie ? new MovieResource($content->load('reviews.user')) : new SeriesResource($content->load('reviews.user'))) : null,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit rating',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Rating $rating): JsonResponse
    {
        try {
            // $this->authorize('view', $rating);

            return response()->json([
                'data' => new RatingResource($rating->load(['user', 'movie', 'episode']))
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch rating',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateRatingRequest $request, Rating $rating): JsonResponse
    {
        try {
            //$this->authorize('update', $rating);

            $updatedRating = $this->ratingService->updateRating($rating, $request->validated());
            $content = null;
            if ($updatedRating->movie_id) {
                $content = Movie::find($updatedRating->movie_id);
            } elseif ($updatedRating->series_id) {
                $content = Series::find($updatedRating->series_id);
            }

            return response()->json([
                'message' => 'Rating updated successfully',
                'rating' => new RatingResource($updatedRating),
                'content' => $content ? ($content instanceof Movie ? new MovieResource($content->load('reviews.user')) : new SeriesResource($content->load('reviews.user'))) : null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update rating',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Rating $rating): JsonResponse
    {
        try {
            //  $this->authorize('delete', $rating);

            $this->ratingService->deleteRating($rating);

            return response()->json([
                'message' => 'Rating deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete rating',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function userRatingsForContent(Request $request, string $type, int $id): JsonResponse
    {
        try {
            $rating = $this->ratingService->getUserRatingForContent($request->user(), $type, $id);

            return response()->json([
                'data' => $rating ? new RatingResource($rating) : null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch user rating',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
