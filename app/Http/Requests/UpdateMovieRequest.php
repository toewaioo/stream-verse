<?php
// app/Http/Requests/UpdateMovieRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        $movieId = $this->route('movie') ?? $this->route('id');

        return [
            'title' => 'sometimes|string|max:255',
            'original_title' => 'nullable|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('movies')->ignore($movieId)
            ],
            'description' => 'sometimes|string',
            'release_date' => 'sometimes|date',
            'runtime' => 'sometimes|integer|min:1',
            'language' => 'sometimes|string|size:2',
            'country' => 'sometimes|string|max:100',
            'imdb_id' => [
                'nullable',
                'string',
                'max:20',
                Rule::unique('movies')->ignore($movieId)
            ],
            'budget' => 'nullable|integer|min:0',
            'revenue' => 'nullable|integer|min:0',
            'trailer_url' => 'nullable|url|max:500',
            'poster_url' => 'nullable|url|max:500',
            'banner_url' => 'nullable|url|max:500',
            'age_rating' => 'sometimes|in:G,PG,PG-13,R,18+',
            'is_vip_only' => 'boolean',
            'visibility_status' => 'sometimes|in:public,private,coming_soon',
            'status' => 'sometimes|in:released,upcoming,canceled',
            'genres' => 'sometimes|array|min:1',
            'genres.*' => 'exists:genres,id',
        ];
    }
}
