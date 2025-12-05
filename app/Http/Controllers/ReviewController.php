<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Review;
use App\Models\Series;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index($type, $id)
    {
        $query = Review::with('user:id,name,avatar_url')
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc');

        if ($type === 'movie') {
            $query->where('movie_id', $id);
        } elseif ($type === 'series') {
            $query->where('series_id', $id);
        } else {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $reviews = $query->paginate(10);

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:movie,series',
            'id' => 'required|integer',
            'rating' => 'required|integer|min:1|max:10',
            'title' => 'nullable|string|max:255',
            'content' => 'required|string|min:10',
            'contains_spoilers' => 'boolean',
        ]);

        $review = new Review();
        $review->user_id = Auth::id();
        $review->rating = $request->rating;
        $review->title = $request->title;
        $review->content = $request->content;
        $review->contains_spoilers = $request->boolean('contains_spoilers');
        $review->is_approved = true; // Auto-approve for now

        if ($request->type === 'movie') {
            $review->movie_id = $request->id;
        } else {
            $review->series_id = $request->id;
        }

        $review->save();

        return response()->json($review->load('user:id,name,avatar_url'), 201);
    }

    public function destroy(Review $review)
    {
        if ($review->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted']);
    }
}
