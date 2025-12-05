<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Movie;
use App\Models\Review;
use App\Models\Series;

class ReviewController extends Controller
{
    public function storeMovieReview(StoreReviewRequest $request, Movie $movie)
    {
        $movie->reviews()->create($request->validated() + ['user_id' => auth()->id()]);

        return redirect()->back()->with('success', 'Review submitted successfully.');
    }

    public function storeSeriesReview(StoreReviewRequest $request, Series $series)
    {
        $series->reviews()->create($request->validated() + ['user_id' => auth()->id()]);

        return redirect()->back()->with('success', 'Review submitted successfully.');
    }

    public function update(UpdateReviewRequest $request, Review $review)
    {
        

        $review->update($request->validated());

        return redirect()->back()->with('success', 'Review updated successfully.');
    }

    public function destroy(Review $review)
    {
       // $this->authorize('delete', $review);

        $review->delete();

        return redirect()->back()->with('success', 'Review deleted successfully.');
    }
}