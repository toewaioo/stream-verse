<?php
// app/Services/RatingService.php
namespace App\Services;

use App\Models\Rating;
use App\Models\Movie;
use App\Models\Episode;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RatingService
{
    public function createRating(User $user, array $data): Rating
    {
        return DB::transaction(function () use ($user, $data) {
            // Check if user already rated this content
            $existingRating = $this->getUserRatingForContent(
                $user,
                $data['movie_id'] ? 'movie' : 'episode',
                $data['movie_id'] ?? $data['episode_id']
            );

            if ($existingRating) {
                throw new \Exception('You have already rated this content');
            }

            $rating = Rating::create(array_merge($data, ['user_id' => $user->id]));

            // Update content rating stats
            $this->updateContentRatingStats($rating);

            return $rating->load(['user', 'movie', 'episode']);
        });
    }

    public function updateRating(Rating $rating, array $data): Rating
    {
        return DB::transaction(function () use ($rating, $data) {
            $rating->update($data);

            // Update content rating stats
            $this->updateContentRatingStats($rating);

            return $rating->fresh(['user', 'movie', 'episode']);
        });
    }

    public function deleteRating(Rating $rating): bool
    {
        return DB::transaction(function () use ($rating) {
            $content = $rating->movie ?? $rating->episode;
            $deleted = $rating->delete();

            if ($deleted && $content) {
                $this->updateContentRatingStats($rating);
            }

            return $deleted;
        });
    }

    public function getUserRatings(User $user)
    {
        return Rating::with(['movie', 'episode.season.series'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(20);
    }

    public function getUserRatingForContent(User $user, string $type, int $contentId): ?Rating
    {
        $column = $type === 'movie' ? 'movie_id' : 'episode_id';

        return Rating::where('user_id', $user->id)
            ->where($column, $contentId)
            ->first();
    }

    public function getContentRatings($content, string $type, int $perPage = 20)
    {
        $column = $type === 'movie' ? 'movie_id' : 'episode_id';

        return Rating::with('user')
            ->where($column, $content->id)
            ->whereNotNull('review_text')
            ->latest()
            ->paginate($perPage);
    }

    private function updateContentRatingStats(Rating $rating): void
    {
        if ($rating->movie) {
            $rating->movie->updateRatingStats();
        } elseif ($rating->episode) {
            $rating->episode->updateRatingStats();

            // Also update series rating stats
            if ($rating->episode->season->series) {
                $rating->episode->season->series->updateRatingStats();
            }
        }
    }

    public function getAverageRating($content, string $type): array
    {
        $column = $type === 'movie' ? 'movie_id' : 'episode_id';

        $stats = Rating::where($column, $content->id)
            ->selectRaw('AVG(rating) as average, COUNT(*) as count')
            ->first();

        return [
            'average' => round($stats->average ?? 0, 1),
            'count' => $stats->count ?? 0,
        ];
    }

    public function getRatingDistribution($content, string $type): array
    {
        $column = $type === 'movie' ? 'movie_id' : 'episode_id';

        return Rating::where($column, $content->id)
            ->selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->orderBy('rating')
            ->get()
            ->pluck('count', 'rating')
            ->toArray();
    }
}
