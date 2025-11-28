<?php
// app/Http/Requests/StoreWatchLinkRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWatchLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'movie_id' => 'required_without:episode_id|exists:movies,id',
            'episode_id' => 'required_without:movie_id|exists:episodes,id',
            'quality' => 'required|in:360p,480p,720p,1080p,4K',
            'server_name' => 'required|string|max:100',
            'source_type' => 'required|in:external,embedded,direct',
            'url' => 'required|url|max:1000',
            'embed_code' => 'nullable|string|max:2000',
            'headers' => 'nullable|array',
            'requires_proxy' => 'boolean',
            'is_active' => 'boolean',
            'is_vip_only' => 'boolean',
            'priority' => 'integer|min:0|max:100',
        ];
    }

    public function messages(): array
    {
        return [
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
                    'Cannot set both movie_id and episode_id.'
                );
                $validator->errors()->add(
                    'episode_id',
                    'Cannot set both movie_id and episode_id.'
                );
            }
        });
    }
}
