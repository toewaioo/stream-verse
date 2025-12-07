<?php
// app/Http/Resources/SeasonResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="SeasonResource",
 *     title="Season Resource",
 *     description="Season resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="season_number", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="air_date", type="string", format="date"),
 *     @OA\Property(property="episode_count", type="integer"),
 *     @OA\Property(property="series", ref="#/components/schemas/SeriesResource"),
 *     @OA\Property(property="episodes", type="array", @OA\Items(ref="#/components/schemas/EpisodeResource")),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class SeasonResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'season_number' => $this->season_number,
            'title' => $this->title,
            'description' => $this->description,
            'air_date' => $this->air_date?->format('Y-m-d'),
            'episode_count' => $this->episode_count,
            'series' => new SeriesResource($this->whenLoaded('series')),
            'episodes' => EpisodeResource::collection($this->whenLoaded('episodes')),
            
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