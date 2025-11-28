<?php
// app/Http/Resources/EpisodeResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EpisodeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'episode_number' => $this->episode_number,
            'title' => $this->title,
            'description' => $this->description,
            'runtime' => $this->runtime,
            'air_date' => $this->air_date?->format('Y-m-d'),
            'view_count' => $this->view_count,
            'poster_url' => $this->poster_url,
            'trailer_url' => $this->trailer_url,
            'imdb_id' => $this->imdb_id,
            'rating_average' => (float) $this->rating_average,
            'rating_count' => $this->rating_count,
            'full_title' => $this->full_title,
            'season' => new SeasonResource($this->whenLoaded('season')),
            'series' => new SeriesResource($this->whenLoaded('series')),
            'watch_links' => WatchLinkResource::collection($this->whenLoaded('watchLinks')),
            'download_links' => DownloadLinkResource::collection($this->whenLoaded('downloadLinks')),
            'actors' => PersonRoleResource::collection($this->whenLoaded('actors')),
            'directors' => PersonRoleResource::collection($this->whenLoaded('directors')),
            'user_rating' => new RatingResource($this->whenLoaded('userRating')),
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
