<?php
// app/Http/Resources/MovieResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="MovieResource",
 *     title="Movie Resource",
 *     description="Movie resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="original_title", type="string"),
 *     @OA\Property(property="slug", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="release_date", type="string", format="date"),
 *     @OA\Property(property="release_year", type="integer"),
 *     @OA\Property(property="runtime", type="integer"),
 *     @OA\Property(property="formatted_runtime", type="string"),
 *     @OA\Property(property="language", type="string"),
 *     @OA\Property(property="country", type="string"),
 *     @OA\Property(property="imdb_id", type="string"),
 *     @OA\Property(property="budget", type="integer"),
 *     @OA\Property(property="revenue", type="integer"),
 *     @OA\Property(property="trailer_url", type="string"),
 *     @OA\Property(property="poster_url", type="string"),
 *     @OA\Property(property="banner_url", type="string"),
 *     @OA\Property(property="rating_average", type="number", format="float"),
 *     @OA\Property(property="rating_count", type="integer"),
 *     @OA\Property(property="age_rating", type="string"),
 *     @OA\Property(property="is_vip_only", type="boolean"),
 *     @OA\Property(property="visibility_status", type="string"),
 *     @OA\Property(property="status", type="string"),
 *     @OA\Property(property="view_count", type="integer"),
 *     @OA\Property(property="genres", type="array", @OA\Items(ref="#/components/schemas/GenreResource")),
 *     @OA\Property(property="person", type="array", @OA\Items(ref="#/components/schemas/PersonResource")),
 *     @OA\Property(property="actors", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="directors", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="writers", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="watch_links", type="array", @OA\Items(ref="#/components/schemas/WatchLinkResource")),
 *     @OA\Property(property="download_links", type="array", @OA\Items(ref="#/components/schemas/DownloadLinkResource")),
 *     @OA\Property(property="ratings", type="array", @OA\Items(ref="#/components/schemas/RatingResource")),
 *     @OA\Property(property="reviews", type="array", @OA\Items(ref="#/components/schemas/ReviewResource")),
 *     @OA\Property(property="user_rating", ref="#/components/schemas/RatingResource"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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