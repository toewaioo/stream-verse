<?php
// app/Http/Resources/SeasonResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
