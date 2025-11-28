<?php
// app/Http/Requests/StoreMovieRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
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
            'slug' => 'required|string|max:255|unique:movies,slug',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'runtime' => 'required|integer|min:1',
            'language' => 'required|string|size:2',
            'country' => 'required|string|max:100',
            'imdb_id' => 'nullable|string|max:20|unique:movies,imdb_id',
            'budget' => 'nullable|integer|min:0',
            'revenue' => 'nullable|integer|min:0',
            'trailer_url' => 'nullable|url|max:500',
            'poster_url' => 'nullable|url|max:500',
            'banner_url' => 'nullable|url|max:500',
            'age_rating' => 'required|in:G,PG,PG-13,R,18+',
            'is_vip_only' => 'boolean',
            'visibility_status' => 'required|in:public,private,coming_soon',
            'status' => 'required|in:released,upcoming,canceled',
            'genres' => 'required|array|min:1',
            'genres.*' => 'exists:genres,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Movie title is required.',
            'slug.unique' => 'This slug is already in use.',
            'release_date.required' => 'Release date is required.',
            'runtime.required' => 'Runtime is required.',
            'genres.required' => 'At least one genre is required.',
            'genres.*.exists' => 'One or more selected genres are invalid.',
        ];
    }
}
