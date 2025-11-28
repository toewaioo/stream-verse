<?php
// app/Http/Requests/UpdateWatchHistoryRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWatchHistoryRequest extends FormRequest
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
            'last_position_seconds' => 'required|integer|min:0',
            'duration_seconds' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'last_position_seconds.required' => 'Current position is required.',
            'duration_seconds.required' => 'Duration is required.',
            'movie_id.required_without' => 'Either movie_id or episode_id is required.',
            'episode_id.required_without' => 'Either movie_id or episode_id is required.',
        ];
    }
}
