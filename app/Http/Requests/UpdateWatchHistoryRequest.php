<?php
// app/Http/Requests/UpdateWatchHistoryRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="UpdateWatchHistoryRequest",
 *     title="Update Watch History Request",
 *     description="Update watch history request body",
 *     @OA\Property(property="movie_id", type="integer", example=1),
 *     @OA\Property(property="episode_id", type="integer", example=1),
 *     @OA\Property(property="last_position_seconds", type="integer", example=300),
 *     @OA\Property(property="duration_seconds", type="integer", example=3600)
 * )
 */
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