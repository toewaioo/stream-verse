<?php
// app/Http/Requests/VipRedeemRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="VipRedeemRequest",
 *     title="Vip Redeem Request",
 *     description="Vip redeem request body",
 *     required={"key"},
 *     @OA\Property(property="key", type="string", example="1234567890123456")
 * )
 */
class VipRedeemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'key' => 'required|string|size:16',
        ];
    }

    public function messages(): array
    {
        return [
            'key.required' => 'VIP key is required.',
            'key.size' => 'VIP key must be 16 characters long.',
        ];
    }
}