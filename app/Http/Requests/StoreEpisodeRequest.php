<?php
// app/Http/Requests/StoreEpisodeRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEpisodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'episode_number' => 'required|integer|min:1',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'runtime' => 'nullable|integer|min:1',
            'air_date' => 'nullable|date',
            'poster_url' => 'nullable|url|max:500',
            'trailer_url' => 'nullable|url|max:500',
            'imdb_id' => 'nullable|string|max:20',
            'season_id' => 'required|exists:seasons,id',
        ];
    }
}
