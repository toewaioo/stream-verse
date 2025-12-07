<?php
// app/Http/Resources/UserResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="UserResource",
 *     title="User Resource",
 *     description="User resource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="avatar_url", type="string"),
 *     @OA\Property(property="role", type="string"),
 *     @OA\Property(property="is_vip", type="boolean"),
 *     @OA\Property(property="email_verified_at", type="string", format="date-time"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 *     @OA\Property(property="vip_subscription", ref="#/components/schemas/VipSubscriptionResource")
 * )
 */
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