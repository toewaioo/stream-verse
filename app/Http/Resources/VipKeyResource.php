<?php
// app/Http/Resources/VipKeyResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VipKeyResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'key' => $this->when($request->user()?->isAdmin(), $this->key),
            'duration_days' => $this->duration_days,
            'is_active' => $this->is_active,
            'max_uses' => $this->max_uses,
            'uses_count' => $this->uses_count,
            'expires_at' => $this->expires_at?->format('Y-m-d H:i:s'),
            'can_be_used' => $this->canBeUsed(),
            'remaining_uses' => $this->max_uses ? $this->max_uses - $this->uses_count : null,
            'subscriptions' => VipSubscriptionResource::collection($this->whenLoaded('subscriptions')),
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
