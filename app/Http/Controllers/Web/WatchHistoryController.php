<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\WatchHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WatchHistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $history = WatchHistory::with(['movie', 'series'])
            ->where('user_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return Inertia::render('User/WatchHistory', [
            'history' => $history
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'movie_id' => 'nullable|exists:movies,id',
            'episode_id' => 'nullable|exists:episodes,id',
            'last_position_seconds' => 'required|integer',
            'duration_seconds' => 'required|integer',
        ]);

        $user = Auth::user();

        // Ensure either movie_id or episode_id is present
        if (!$request->movie_id && !$request->episode_id) {
            return response()->json(['message' => 'Movie or Episode ID required'], 400);
        }

        $history = WatchHistory::updateOrCreate(
            [
                'user_id' => $user->id,
                'movie_id' => $request->movie_id,
                'series_id' => $request->series_id,
            ],

        );

        // Calculate percentage and completion status using the model method
        // We need to re-fetch or manually call the logic since updateOrCreate doesn't call custom methods automatically on the instance during creation in the same way for the update part if we want to use the method logic.
        // Actually, let's just use the method on the instance.
        // $history->updateProgress($request->last_position_seconds, $request->duration_seconds);

        return response()->json(['message' => 'Progress saved', 'history' => $history]);
    }

    public function destroy($id)
    {
        $history = WatchHistory::where('user_id', Auth::id())->findOrFail($id);
        $history->delete();

        return back()->with('success', 'Removed from history.');
    }

    public function clear()
    {
        WatchHistory::where('user_id', Auth::id())->delete();
        return back()->with('success', 'History cleared.');
    }
}
