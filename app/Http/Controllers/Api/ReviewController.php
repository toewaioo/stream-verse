<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Movie;
use App\Models\Review;
use App\Models\Series;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function storeMovieReview(StoreReviewRequest $request, Movie $movie)
    {
        $review = $movie->reviews()->create($request->validated() + ['user_id' => auth()->id()]);

        return new ReviewResource($review);
    }

    public function storeSeriesReview(StoreReviewRequest $request, Series $series)
    {
        $review = $series->reviews()->create($request->validated() + ['user_id' => auth()->id()]);

        return new ReviewResource($review);
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
        $this->authorize('update', $review);

        $review->update($request->validated());

        return new ReviewResource($review);
    }

    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);

        $review->delete();

        return response()->noContent();
    }
}