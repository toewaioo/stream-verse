<?php
// app/Http/Resources/SeriesResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="SeriesResource",
 *     title="Series Resource",
 *     description="Series resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="original_title", type="string"),
 *     @OA\Property(property="slug", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="release_year_start", type="integer"),
 *     @OA\Property(property="release_year_end", type="integer"),
 *     @OA\Property(property="status", type="string"),
 *     @OA\Property(property="language", type="string"),
 *     @OA\Property(property="country", type="string"),
 *     @OA\Property(property="imdb_id", type="string"),
 *     @OA\Property(property="poster_url", type="string"),
 *     @OA\Property(property="banner_url", type="string"),
 *     @OA\Property(property="trailer_url", type="string"),
 *     @OA\Property(property="age_rating", type="string"),
 *     @OA\Property(property="is_vip_only", type="boolean"),
 *     @OA\Property(property="rating_average", type="number", format="float"),
 *     @OA\Property(property="rating_count", type="integer"),
 *     @OA\Property(property="total_episodes", type="integer"),
 *     @OA\Property(property="view_count", type="integer"),
 *     @OA\Property(property="genres", type="array", @OA\Items(ref="#/components/schemas/GenreResource")),
 *     @OA\Property(property="seasons", type="array", @OA\Items(ref="#/components/schemas/SeasonResource")),
 *     @OA\Property(property="actors", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="directors", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="latest_episodes", type="array", @OA\Items(ref="#/components/schemas/EpisodeResource")),
 *     @OA\Property(property="reviews", type="array", @OA\Items(ref="#/components/schemas/ReviewResource")),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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