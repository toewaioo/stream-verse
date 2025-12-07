<?php
// app/Http/Resources/RatingResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="RatingResource",
 *     title="Rating Resource",
 *     description="Rating resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="rating", type="integer"),
 *     @OA\Property(property="review_text", type="string"),
 *     @OA\Property(property="spoiler_flag", type="boolean"),
 *     @OA\Property(property="user", ref="#/components/schemas/UserResource"),
 *     @OA\Property(property="movie", ref="#/components/schemas/MovieResource"),
 *     @OA\Property(property="series", ref="#/components/schemas/SeriesResource"),
 *     @OA\Property(property="episode", ref="#/components/schemas/EpisodeResource"),
 *     @OA\Property(property="content_type", type="string"),
 *     @OA\Property(property="content_title", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 *     @OA\Property(property="rating_average", type="number", format="float"),
 *     @OA\Property(property="rating_count", type="integer")
 * )
 */
class RatingResource extends JsonResource
{
    public function toArray($request)
    {
        $content = $this->whenLoaded('movie') ?? $this->whenLoaded('series');

        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'review_text' => $this->review_text,
            'spoiler_flag' => $this->spoiler_flag,
            'user' => new UserResource($this->whenLoaded('user')),
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'series' => new SeriesResource($this->whenLoaded('series')),
            'episode' => new EpisodeResource($this->whenLoaded('episode')),
            'content_type' => $this->movie_id ? 'movie' : ($this->series_id ? 'series' : 'episode'),
            'content_title' => $this->getContentTitle(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'rating_average' => $content ? $content->rating_average : null,
            'rating_count' => $content ? $content->rating_count : null,
        ];
    }

    private function getContentTitle(): ?string
    {
        if ($this->movie) {
            return $this->movie->title;
        }

        if ($this->episode) {
            return $this->episode->full_title;
        }

        return null;
    }

    public function with($request)
    {
        return [
            'success' => true,
        ];
    }
}