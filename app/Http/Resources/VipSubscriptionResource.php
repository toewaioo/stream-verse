<?php
// app/Http/Resources/VipSubscriptionResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="VipSubscriptionResource",
 *     title="Vip Subscription Resource",
 *     description="Vip subscription resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="start_date", type="string", format="date-time"),
 *     @OA\Property(property="end_date", type="string", format="date-time"),
 *     @OA\Property(property="is_active", type="boolean"),
 *     @OA\Property(property="days_remaining", type="integer"),
 *     @OA\Property(property="total_duration_days", type="integer"),
 *     @OA\Property(property="user", ref="#/components/schemas/UserResource"),
 *     @OA\Property(property="vip_key", ref="#/components/schemas/VipKeyResource"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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