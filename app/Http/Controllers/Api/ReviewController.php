<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\MovieResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\SeriesResource;
use App\Models\Movie;
use App\Models\Review;
use App\Models\Series;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function storeMovieReview(StoreReviewRequest $request, Movie $movie)
    {
        $review = $movie->reviews()->create($request->validated() + ['user_id' => auth()->id()]);
        $review->load('user');
        return response()->json([
            'review' => new ReviewResource($review),
        ]);
    }

    public function storeSeriesReview(StoreReviewRequest $request, Series $series)
    {
        $review = $series->reviews()->create($request->validated() + ['user_id' => auth()->id()]);
        $review->load('user');
        return response()->json([
            'review' => new ReviewResource($review),
        ]);
    }

    public function getMovieReviews(Movie $movie)
    {
        return ReviewResource::collection($movie->reviews()->with('user')->paginate(10));
    }

    public function getSeriesReviews(Series $series)
    {
        return ReviewResource::collection($series->reviews()->with('user')->paginate(10));
    }

    public function update(UpdateReviewRequest $request, Review $review)
    {
        $review->update($request->validated());
        $review->load('user');

        return response()->json([
            'review' => new ReviewResource($review),
        ]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(null, 204);
    }
}
