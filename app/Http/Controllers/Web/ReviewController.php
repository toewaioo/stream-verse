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

        return redirect()->route('movies.show', $movie->slug)->with('success', 'Review submitted successfully.');
    }

    public function storeSeriesReview(StoreReviewRequest $request, Series $series)
    {
        $series->reviews()->create($request->validated() + ['user_id' => auth()->id()]);

        return redirect()->route('series.show', $series->slug)->with('success', 'Review submitted successfully.');
    }

    public function update(UpdateReviewRequest $request, Review $review)
    {
        $review->update($request->validated());

        $reviewable = $review->reviewable;
        if ($reviewable instanceof Movie) {
            return redirect()->route('movies.show', $reviewable->slug)->with('success', 'Review updated successfully.');
        }
        if ($reviewable instanceof Series) {
            return redirect()->route('series.show', $reviewable->slug)->with('success', 'Review updated successfully.');
        }

        return redirect()->back()->with('success', 'Review updated successfully.');
    }

    public function destroy(Review $review)
    {
        // $this->authorize('delete', $review);

        $reviewable = $review->reviewable;
        $review->delete();

        if ($reviewable instanceof Movie) {
            return redirect()->route('movies.show', $reviewable->slug)->with('success', 'Review deleted successfully.');
        }
        if ($reviewable instanceof Series) {
            return redirect()->route('series.show', $reviewable->slug)->with('success', 'Review deleted successfully.');
        }

        return redirect()->back()->with('success', 'Review deleted successfully.');
    }
}