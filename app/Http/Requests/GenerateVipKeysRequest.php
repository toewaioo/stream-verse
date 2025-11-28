<?php
// app/Http/Requests/GenerateVipKeysRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateVipKeysRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'count' => 'required|integer|min:1|max:100',
            'duration_days' => 'required|integer|min:1|max:365',
            'max_uses' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:today',
        ];
    }

    public function messages(): array
    {
        return [
            'count.max' => 'Cannot generate more than 100 keys at once.',
            'duration_days.max' => 'Duration cannot exceed 365 days.',
        ];
    }
}
