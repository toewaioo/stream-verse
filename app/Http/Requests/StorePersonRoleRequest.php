<?php
// app/Http/Requests/StorePersonRoleRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePersonRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'person_id' => 'required|exists:persons,id',
            'movie_id' => 'required_without_all:series_id,season_id,episode_id|exists:movies,id',
            'series_id' => 'required_without_all:movie_id,season_id,episode_id|exists:series,id',
            'season_id' => 'required_without_all:movie_id,series_id,episode_id|exists:seasons,id',
            'episode_id' => 'required_without_all:movie_id,series_id,season_id|exists:episodes,id',
            'role_type' => 'required|in:actor,director,writer,producer,composer,editor,cinematographer',
            'character_name' => 'nullable|string|max:255',
            'order_index' => 'integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'movie_id.required_without_all' => 'One content type (movie, series, season, or episode) is required.',
            'role_type.required' => 'Role type is required.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $contentTypes = [
                $this->movie_id,
                $this->series_id,
                $this->season_id,
                $this->episode_id
            ];

            $filledTypes = array_filter($contentTypes);

            if (count($filledTypes) !== 1) {
                $validator->errors()->add(
                    'movie_id',
                    'Exactly one content type must be specified.'
                );
            }
        });
    }
}
