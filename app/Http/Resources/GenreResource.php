<?php
// app/Http/Resources/GenreResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="GenreResource",
 *     title="Genre Resource",
 *     description="Genre resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="slug", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="is_active", type="boolean"),
 *     @OA\Property(property="movie_count", type="integer"),
 *     @OA\Property(property="series_count", type="integer"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class GenreResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'is_active' => $this->is_active,
            'movie_count' => $this->when(isset($this->movies_count), $this->movies_count),
            'series_count' => $this->when(isset($this->series_count), $this->series_count),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}