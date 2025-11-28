<?php
// app/Http/Requests/StorePersonRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePersonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'death_date' => 'nullable|date|after:birth_date',
            'gender' => 'nullable|in:male,female,other',
            'avatar_url' => 'nullable|url|max:500',
            'country' => 'nullable|string|max:100',
            'imdb_id' => 'nullable|string|max:20|unique:persons,imdb_id',
        ];
    }
}
