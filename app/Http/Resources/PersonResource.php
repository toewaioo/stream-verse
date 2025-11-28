<?php
// app/Http/Resources/PersonResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'biography' => $this->biography,
            'birth_date' => $this->birth_date?->format('Y-m-d'),
            'death_date' => $this->death_date?->format('Y-m-d'),
            'gender' => $this->gender,
            'avatar_url' => $this->avatar_url,
            'country' => $this->country,
            'imdb_id' => $this->imdb_id,
            'age' => $this->birth_date ? now()->diffInYears($this->birth_date) : null,
            'roles' => PersonRoleResource::collection($this->whenLoaded('roles')),
            'movie_credits' => MovieResource::collection($this->whenLoaded('movies')),
            'series_credits' => SeriesResource::collection($this->whenLoaded('series')),
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
