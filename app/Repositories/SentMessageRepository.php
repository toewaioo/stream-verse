<?php

namespace App\Repositories;

use App\Models\SentMessage;

class SentMessageRepository
{
    public function trackMessage(array $data): int
    {
        $sentMessage = SentMessage::create([
            'video_mapping_id' => $data['video_mapping_id'],
            'user_id' => $data['user_id'],
            'chat_id' => $data['chat_id'],
            'message_id' => $data['message_id'],
            'deep_link' => $data['deep_link'],
            'sent_at' => now()
        ]);

        return $sentMessage->id;
    }
}
