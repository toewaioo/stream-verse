<?php
// app/Http/Resources/PersonRoleResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="PersonRoleResource",
 *     title="Person Role Resource",
 *     description="Person role resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="role_type", type="string"),
 *     @OA\Property(property="character_name", type="string"),
 *     @OA\Property(property="order_index", type="integer"),
 *     @OA\Property(property="person", ref="#/components/schemas/PersonResource"),
 *     @OA\Property(property="movie", ref="#/components/schemas/MovieResource"),
 *     @OA\Property(property="series", ref="#/components/schemas/SeriesResource"),
 *     @OA\Property(property="season", ref="#/components/schemas/SeasonResource"),
 *     @OA\Property(property="episode", ref="#/components/schemas/EpisodeResource"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class PersonRoleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'role_type' => $this->role_type,
            'character_name' => $this->character_name,
            'order_index' => $this->order_index,
            'person' => new PersonResource($this->whenLoaded('person')),
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'series' => new SeriesResource($this->whenLoaded('series')),
            'season' => new SeasonResource($this->whenLoaded('season')),
            'episode' => new EpisodeResource($this->whenLoaded('episode')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}