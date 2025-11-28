<?php
// app/Http/Requests/StoreRatingRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRatingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'movie_id' => 'required_without:episode_id|exists:movies,id',
            'episode_id' => 'required_without:movie_id|exists:episodes,id',
            'rating' => 'required|integer|between:1,10',
            'review_text' => 'nullable|string|max:1000',
            'spoiler_flag' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'rating.required' => 'Rating is required.',
            'rating.between' => 'Rating must be between 1 and 10.',
            'movie_id.required_without' => 'Either movie_id or episode_id is required.',
            'episode_id.required_without' => 'Either movie_id or episode_id is required.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if ($this->movie_id && $this->episode_id) {
                $validator->errors()->add(
                    'movie_id',
                    'Cannot rate both a movie and an episode simultaneously.'
                );
            }
        });
    }
}
