<?php
// app/Http/Resources/DownloadLinkResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="DownloadLinkResource",
 *     title="Download Link Resource",
 *     description="Download link resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="quality", type="string"),
 *     @OA\Property(property="server_name", type="string"),
 *     @OA\Property(property="source_type", type="string"),
 *     @OA\Property(property="url", type="string"),
 *     @OA\Property(property="file_size", type="integer"),
 *     @OA\Property(property="file_format", type="string"),
 *     @OA\Property(property="requires_proxy", type="boolean"),
 *     @OA\Property(property="is_active", type="boolean"),
 *     @OA\Property(property="is_vip_only", type="boolean"),
 *     @OA\Property(property="priority", type="integer"),
 *     @OA\Property(property="success_rate", type="number", format="float"),
 *     @OA\Property(property="last_checked_at", type="string", format="date-time"),
 *     @OA\Property(property="download_url", type="string"),
 *     @OA\Property(property="movie", ref="#/components/schemas/MovieResource"),
 *     @OA\Property(property="episode", ref="#/components/schemas/EpisodeResource"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class DownloadLinkResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'quality' => $this->quality,
            'server_name' => $this->server_name,
            'source_type' => $this->source_type,
            'url' => $this->when($request->user()?->isAdmin(), $this->url),
            'file_size' => $this->file_size,
            'file_format' => $this->file_format,
            'requires_proxy' => $this->requires_proxy,
            'is_active' => $this->is_active,
            'is_vip_only' => $this->is_vip_only,
            'priority' => $this->priority,
            'success_rate' => $this->success_rate,
            'last_checked_at' => $this->last_checked_at,
            'download_url' => $this->when(!$request->user()?->isAdmin(), $this->getDownloadUrl()),
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'episode' => new EpisodeResource($this->whenLoaded('episode')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function getDownloadUrl(): string
    {
        if ($this->requires_proxy) {
            return route('api.download.proxy', ['linkId' => $this->id]);
        }

        return $this->url;
    }
}