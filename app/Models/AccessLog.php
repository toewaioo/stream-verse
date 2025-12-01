<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class AccessLog extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'video_mapping_id',
        'user_id',
        'user_first_name',
        'user_username',
        'accessed_at',
        'success',
        'error_message',
        'access_count'
    ];

    protected $casts = [
        'success' => 'boolean',
        'access_count' => 'integer',
        'accessed_at' => 'datetime'
    ];

    public function videoMapping()
    {
        return $this->belongsTo(VideoMapping::class);
    }
}
