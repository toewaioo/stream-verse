<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class SentMessage extends Model
{
    //
     use HasFactory;

    protected $fillable = [
        'video_mapping_id',
        'user_id',
        'chat_id',
        'message_id',
        'deep_link',
        'sent_at'
    ];

    protected $casts = [
        'sent_at' => 'datetime'
    ];

    public function videoMapping()
    {
        return $this->belongsTo(VideoMapping::class);
    }
}
