<?php
// app/Http/Requests/StoreSeriesRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSeriesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'original_title' => 'nullable|string|max:255',
            'slug' => 'required|string|max:255|unique:series,slug',
            'description' => 'required|string',
            'release_year_start' => 'required|integer|min:1900|max:' . date('Y'),
            'release_year_end' => 'nullable|integer|min:1900|max:' . (date('Y') + 10),
            'status' => 'required|in:ongoing,upcoming,ended',
            'language' => 'required|string|size:2',
            'country' => 'required|string|max:100',
            'imdb_id' => 'nullable|string|max:20|unique:series,imdb_id',
            'poster_url' => 'nullable|url|max:500',
            'banner_url' => 'nullable|url|max:500',
            'trailer_url' => 'nullable|url|max:500',
            'age_rating' => 'required|in:G,PG,PG-13,R,18+',
            'is_vip_only' => 'boolean',
            'genres' => 'required|array|min:1',
            'genres.*' => 'exists:genres,id',
        ];
    }

    public function messages(): array
    {
        return [
            'release_year_start.required' => 'Start year is required.',
            'release_year_end.gte' => 'End year must be greater than or equal to start year.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if ($this->release_year_end && $this->release_year_start > $this->release_year_end) {
                $validator->errors()->add(
                    'release_year_end',
                    'End year must be greater than or equal to start year.'
                );
            }
        });
    }
}
