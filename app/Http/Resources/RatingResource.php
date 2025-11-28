<?php
// app/Http/Resources/RatingResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'review_text' => $this->review_text,
            'spoiler_flag' => $this->spoiler_flag,
            'user' => new UserResource($this->whenLoaded('user')),
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'episode' => new EpisodeResource($this->whenLoaded('episode')),
            'content_type' => $this->movie_id ? 'movie' : 'episode',
            'content_title' => $this->getContentTitle(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
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
