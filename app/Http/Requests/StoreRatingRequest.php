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
            'movie_id' => 'required_without_all:episode_id,series_id|exists:movies,id',
            'series_id' => 'required_without_all:movie_id,episode_id|exists:series,id',
            'episode_id' => 'required_without_all:movie_id,series_id|exists:episodes,id',
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
            'movie_id.required_without_all' => 'Content ID (movie, series, or episode) is required.',
            'series_id.required_without_all' => 'Content ID (movie, series, or episode) is required.',
            'episode_id.required_without_all' => 'Content ID (movie, series, or episode) is required.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $count = 0;
            if ($this->movie_id) $count++;
            if ($this->series_id) $count++;
            if ($this->episode_id) $count++;

            if ($count > 1) {
                $validator->errors()->add(
                    'base',
                    'Cannot rate multiple content types simultaneously.'
                );
            }
        });
    }
}
