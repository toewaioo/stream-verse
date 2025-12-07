<?php
// app/Http/Resources/PersonResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="PersonResource",
 *     title="Person Resource",
 *     description="Person resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="biography", type="string"),
 *     @OA\Property(property="birth_date", type="string", format="date"),
 *     @OA\Property(property="death_date", type="string", format="date"),
 *     @OA\Property(property="gender", type="string"),
 *     @OA\Property(property="avatar_url", type="string"),
 *     @OA\Property(property="country", type="string"),
 *     @OA\Property(property="imdb_id", type="string"),
 *     @OA\Property(property="age", type="integer"),
 *     @OA\Property(property="roles", type="array", @OA\Items(ref="#/components/schemas/PersonRoleResource")),
 *     @OA\Property(property="movie_credits", type="array", @OA\Items(ref="#/components/schemas/MovieResource")),
 *     @OA\Property(property="series_credits", type="array", @OA\Items(ref="#/components/schemas/SeriesResource")),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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