<?php
// app/Http/Resources/SeriesCollection.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;



/**
 * @OA\Schema(
 *     schema="SeriesCollection",
 *     title="Series Collection",
 *     description="Series collection resource",
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/SeriesResource")
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
class SeriesCollection extends ResourceCollection
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
            'message' => 'Series retrieved successfully',
        ];
    }
}
