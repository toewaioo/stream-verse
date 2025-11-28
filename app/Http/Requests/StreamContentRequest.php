<?php
// app/Http/Requests/StreamContentRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StreamContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quality' => 'nullable|in:360p,480p,720p,1080p,4K',
        ];
    }
}
