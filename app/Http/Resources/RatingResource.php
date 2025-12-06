<?php
// app/Http/Resources/RatingResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
