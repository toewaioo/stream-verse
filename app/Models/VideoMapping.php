<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VideoMapping extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'title',
        'token',
        'chat_id',
        'message_id',
        'file_id',
        'file_type',
        'file_size',
        'duration',
        'mime_type',
        'is_active',
        'access_count',
        'last_accessed'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'file_size' => 'integer',
        'duration' => 'integer',
        'access_count' => 'integer',
        'last_accessed' => 'datetime'
    ];
    public function sentMessages()
    {
        return $this->hasMany(SentMessage::class);
    }
}
