<?php
// app/Http/Resources/LinkHealthCheckResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="LinkHealthCheckResource",
 *     title="Link Health Check Resource",
 *     description="Link health check resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="is_working", type="boolean"),
 *     @OA\Property(property="response_time_ms", type="integer"),
 *     @OA\Property(property="http_status", type="integer"),
 *     @OA\Property(property="error_message", type="string"),
 *     @OA\Property(property="checked_at", type="string", format="date-time"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class LinkHealthCheckResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'is_working' => $this->is_working,
            'response_time_ms' => $this->response_time_ms,
            'http_status' => $this->http_status,
            'error_message' => $this->error_message,
            'checked_at' => $this->checked_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}