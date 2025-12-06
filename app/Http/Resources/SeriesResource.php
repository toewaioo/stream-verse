<?php
// app/Http/Resources/SeriesResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SeriesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'original_title' => $this->original_title,
            'slug' => $this->slug,
            'description' => $this->description,
            'release_year_start' => $this->release_year_start,
            'release_year_end' => $this->release_year_end,
            'status' => $this->status,
            'language' => $this->language,
            'country' => $this->country,
            'imdb_id' => $this->imdb_id,
            'poster_url' => $this->poster_url,
            'banner_url' => $this->banner_url,
            'trailer_url' => $this->trailer_url,
            'age_rating' => $this->age_rating,
            'is_vip_only' => $this->is_vip_only,
            'rating_average' => (float) $this->rating_average,
            'rating_count' => $this->rating_count,
            'total_episodes' => $this->total_episodes,
            'view_count' => $this->view_count,
            'genres' => GenreResource::collection($this->whenLoaded('genres')),
            'seasons' => SeasonResource::collection($this->whenLoaded('seasons')),
            'actors' => PersonRoleResource::collection($this->whenLoaded('actors')),
            'directors' => PersonRoleResource::collection($this->whenLoaded('directors')),
            'latest_episodes' => EpisodeResource::collection($this->whenLoaded('latestEpisodes')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
        ];
    }
}
