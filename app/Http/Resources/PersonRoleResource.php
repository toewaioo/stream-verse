<?php
// app/Http/Resources/PersonRoleResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
