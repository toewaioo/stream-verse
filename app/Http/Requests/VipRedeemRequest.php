<?php
// app/Http/Requests/VipRedeemRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
