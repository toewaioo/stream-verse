<?php
// app/Http/Resources/VipSubscriptionResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VipSubscriptionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'start_date' => $this->start_date?->format('Y-m-d H:i:s'),
            'end_date' => $this->end_date?->format('Y-m-d H:i:s'),
            'is_active' => $this->isActive(),
            'days_remaining' => $this->daysRemaining(),
            'total_duration_days' => $this->start_date && $this->end_date ? $this->start_date->diffInDays($this->end_date) : null,
            'user' => new UserResource($this->whenLoaded('user')),
            'vip_key' => new VipKeyResource($this->whenLoaded('vipKey')),
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
