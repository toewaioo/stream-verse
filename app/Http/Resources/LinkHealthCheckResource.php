<?php
// app/Http/Resources/LinkHealthCheckResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
