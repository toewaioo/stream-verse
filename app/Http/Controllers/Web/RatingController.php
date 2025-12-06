<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRatingRequest;
use App\Http\Requests\UpdateRatingRequest;
use App\Models\Movie;
use App\Models\Rating;
use App\Models\Series;
use App\Services\RatingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function __construct(private RatingService $ratingService)
    {
    }

    public function store(StoreRatingRequest $request): RedirectResponse
    {
        try {
            $this->ratingService->createRating($request->user(), $request->validated());

            $validated = $request->validated();
            if (isset($validated['movie_id'])) {
                $movie = Movie::find($validated['movie_id']);
                return redirect()->route('movies.show', $movie->slug)->with('flash', 'Rating submitted successfully.');
            }
            if (isset($validated['series_id'])) {
                $series = Series::find($validated['series_id']);
                return redirect()->route('series.show', $series->slug)->with('flash', 'Rating submitted successfully.');
            }

            return back()->with('flash', 'Rating submitted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(UpdateRatingRequest $request, Rating $rating): RedirectResponse
    {
        try {
            // Ensure user owns the rating
            if ($request->user()->id !== $rating->user_id) {
                return redirect()->back()->with('error', 'Unauthorized.');
            }

            $this->ratingService->updateRating($rating, $request->validated());

            if ($rating->movie_id) {
                return redirect()->route('movies.show', $rating->movie->slug)->with('flash', 'Rating updated successfully.');
            }
            if ($rating->series_id) {
                return redirect()->route('series.show', $rating->series->slug)->with('flash', 'Rating updated successfully.');
            }

            return back()->with('flash', 'Rating updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy(Rating $rating): RedirectResponse
    {
        try {
            if (request()->user()->id !== $rating->user_id) {
                return redirect()->back()->with('error', 'Unauthorized.');
            }

            $this->ratingService->deleteRating($rating);

            return redirect()->back()->with('success', 'Rating deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
