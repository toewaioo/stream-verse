<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'content',
        'rating',
    ];

    /**
     * Get the parent reviewable model (movie or series).
     */
    public function reviewable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user that created the review.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}