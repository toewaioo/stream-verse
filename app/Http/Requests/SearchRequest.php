<?php
// app/Http/Requests/SearchRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'q' => 'required|string|min:2|max:100',
            'type' => 'nullable|in:movie,series,person,all',
            'genre' => 'nullable|string|max:50',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 5),
            'rating' => 'nullable|numeric|min:0|max:10',
            'status' => 'nullable|in:released,upcoming,ongoing,ended',
            'vip_only' => 'nullable|boolean',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'q.required' => 'Search query is required.',
            'q.min' => 'Search query must be at least 2 characters.',
        ];
    }
}
