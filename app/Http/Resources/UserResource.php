<?php
// app/Http/Resources/UserResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar_url' => $this->avatar_url,
            'role' => $this->role,
            'is_vip' => $this->isVIP(),
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'vip_subscription' => new VipSubscriptionResource($this->whenLoaded('vipSubscriptions', function () {
                return $this->vipSubscriptions->where('end_date', '>', now())->first();
            })),
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
        ];
    }
}
