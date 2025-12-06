<?php
// app/Http/Resources/MovieResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'original_title' => $this->original_title,
            'slug' => $this->slug,
            'description' => $this->description,
            'release_date' => $this->release_date?->format('Y-m-d'),
            'release_year' => $this->release_date?->year,
            'runtime' => $this->runtime,
            'formatted_runtime' => $this->formatted_runtime,
            'language' => $this->language,
            'country' => $this->country,
            'imdb_id' => $this->imdb_id,
            'budget' => $this->budget,
            'revenue' => $this->revenue,
            'trailer_url' => $this->trailer_url,
            'poster_url' => $this->poster_url,
            'banner_url' => $this->banner_url,
            'rating_average' => (float) $this->rating_average,
            'rating_count' => $this->rating_count,
            'age_rating' => $this->age_rating,
            'is_vip_only' => $this->is_vip_only,
            'visibility_status' => $this->visibility_status,
            'status' => $this->status,
            'view_count' => $this->view_count,
            'genres' => GenreResource::collection($this->whenLoaded('genres')),
            'person' => PersonResource::collection($this->whenLoaded('person')),
            'actors' => PersonRoleResource::collection($this->whenLoaded('actors')),
            'directors' => PersonRoleResource::collection($this->whenLoaded('directors')),
            'writers' => PersonRoleResource::collection($this->whenLoaded('writers')),
            'watch_links' => WatchLinkResource::collection($this->whenLoaded('watchLinks')),
            'download_links' => DownloadLinkResource::collection($this->whenLoaded('downloadLinks')),
            'ratings' => RatingResource::collection($this->whenLoaded('ratings')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
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
