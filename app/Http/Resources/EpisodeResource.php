<?php
// app/Http/Resources/EpisodeResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="EpisodeResource",
 *     title="Episode Resource",
 *     description="Episode resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="episode_number", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="runtime", type="integer"),
 *     @OA\Property(property="air_date", type="string", format="date"),
 *     @OA\Property(property="view_count", type="integer"),
 *     @OA\Property(property="poster_url", type="string"),
 *     @OA\Property(property="trailer_url", type="string"),
 *     @OA\Property(property="imdb_id", type="string"),
 *     @OA\Property(property="rating_average", type="number", format="float"),
 *     @OA\Property(property="rating_count", type="integer"),
 *     @OA\Property(property="full_title", type="string"),
 *     @OA\Property(property="season", ref="#/components/schemas/SeasonResource"),
 *     @OA\Property(property="series", ref="#/components/schemas/SeriesResource"),
 *     @OA\Property(property="watch_links", type="array", @OA\Items(ref="#/components/schemas/WatchLinkResource")),
 *     @OA\Property(property="download_links", type="array", @OA\Items(ref="#/components/schemas/DownloadLinkResource")),
 *     @OA\Property(property="actors", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="directors", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="user_rating", ref="#/components/schemas/RatingResource"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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