<?php
// app/Http/Resources/WatchLinkResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WatchLinkResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'quality' => $this->quality,
            'server_name' => $this->server_name,
            'source_type' => $this->source_type,
            'url' => $this->when($request->user()?->isAdmin(), $this->url),
            'embed_code' => $this->when($request->user()?->isAdmin(), $this->embed_code),
            'requires_proxy' => $this->requires_proxy,
            'is_active' => $this->is_active,
            'is_vip_only' => $this->is_vip_only,
            'priority' => $this->priority,
            'success_rate' => $this->success_rate,
            'last_checked_at' => $this->last_checked_at,
            'stream_url' => $this->when(!$request->user()?->isAdmin(), $this->getStreamUrl()),
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'episode' => new EpisodeResource($this->whenLoaded('episode')),
            'health_checks' => LinkHealthCheckResource::collection($this->whenLoaded('healthChecks')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function getStreamUrl(): string
    {
        if ($this->requires_proxy) {
            return route('api.stream.proxy', ['linkId' => $this->id]);
        }

        return $this->url;
    }
}
