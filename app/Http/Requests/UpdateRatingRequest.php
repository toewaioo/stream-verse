<?php
// app/Http/Requests/UpdateRatingRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRatingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rating' => 'sometimes|integer|between:1,10',
            'review_text' => 'nullable|string|max:1000',
            'spoiler_flag' => 'boolean',
        ];
    }
}
