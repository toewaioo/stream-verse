<?php
// app/Http/Resources/MovieCollection.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * @OA\Schema(
 *     schema="MovieCollection",
 *     title="Movie Collection",
 *     description="Movie collection resource",
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/MovieResource")
 *     ),
 *     @OA\Property(
 *         property="meta",
 *         type="object",
 *         @OA\Property(property="current_page", type="integer"),
 *         @OA\Property(property="last_page", type="integer"),
 *         @OA\Property(property="per_page", type="integer"),
 *         @OA\Property(property="total", type="integer"),
 *         @OA\Property(property="from", type="integer"),
 *         @OA\Property(property="to", type="integer"),
 *         @OA\Property(property="path", type="string"),
 *     ),
 *     @OA\Property(
 *         property="links",
 *         type="object",
 *         @OA\Property(property="first", type="string"),
 *         @OA\Property(property="last", type="string"),
 *         @OA\Property(property="prev", type="string"),
 *         @OA\Property(property="next", type="string"),
 *     )
 * )
 */
class MovieCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'per_page' => $this->perPage(),
                'total' => $this->total(),
                'from' => $this->firstItem(),
                'to' => $this->lastItem(),
                'path' => $this->path(),
            ],
            'links' => [
                'first' => $this->url(1),
                'last' => $this->url($this->lastPage()),
                'prev' => $this->previousPageUrl(),
                'next' => $this->nextPageUrl(),
            ],
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
            'message' => 'Movies retrieved successfully',
        ];
    }
}