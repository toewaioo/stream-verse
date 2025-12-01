<?php

namespace App\Services\Telegram;

use Illuminate\Support\Facades\Log;

use function Laravel\Prompts\warning;

class VideoService
{
    private $telegramApi;
    private $messageService;

    public function __construct(TelegramApiService $telegramApi, MessageService $messageService)
    {
        $this->telegramApi = $telegramApi;
        $this->messageService = $messageService;
    }

    public function sendVideoToUser(int $chatId, array $mapping, ?array $keyboard = null): array
    {
        if (!empty($mapping['file_id'])) {
            Log::info("Using file_id to send video: " . $mapping['file_id'], ['chat_id' => $chatId]);
            $data = [
                'chat_id' => $chatId,
                'video' => $mapping['file_id'],
                'caption' => $mapping['title'],
                'parse_mode' => 'HTML',
            ];
            if ($keyboard) {
                $data['reply_markup'] = json_encode($keyboard);
            }
            switch ($mapping['file_type']) {
                case 'video':
                    return $this->telegramApi->sendVideo($data);
                case 'document':
                case 'animation':
                    return $this->telegramApi->sendDocument([
                        'chat_id' => $chatId,
                        'document' => $mapping['file_id'],
                        'caption' => $mapping['title'],
                        'parse_mode' => 'HTML'
                    ]);
            }
        }

        Log::info("Falling back to forward method", ['chat_id' => $chatId]);
        return $this->telegramApi->forwardMessage([
            'chat_id' => $chatId,
            'from_chat_id' => $mapping['chat_id'],
            'message_id' => $mapping['message_id']
        ]);
    }

    public function extractFileInfo(array $message): array
    {
        return [
            'file_id' => $this->extractFileId($message),
            'file_type' => $this->getFileType($message),
            'file_size' => $this->extractFileSize($message),
            'duration' => $this->extractDuration($message),
            'mime_type' => $this->extractMimeType($message)
        ];
    }

    private function extractFileId(array $message): ?string
    {
        if (isset($message['video'])) return $message['video']['file_id'];
        if (isset($message['document'])) return $message['document']['file_id'];
        if (isset($message['animation'])) return $message['animation']['file_id'];
        return null;
    }

    private function getFileType(array $message): string
    {
        if (isset($message['video'])) return 'video';
        if (isset($message['document'])) return 'document';
        if (isset($message['animation'])) return 'animation';
        return 'unknown';
    }

    private function extractFileSize(array $message): ?int
    {
        if (isset($message['video'])) return $message['video']['file_size'] ?? null;
        if (isset($message['document'])) return $message['document']['file_size'] ?? null;
        if (isset($message['animation'])) return $message['animation']['file_size'] ?? null;
        return null;
    }

    private function extractDuration(array $message): ?int
    {
        if (isset($message['video'])) return $message['video']['duration'] ?? null;
        if (isset($message['animation'])) return $message['animation']['duration'] ?? null;
        return null;
    }

    private function extractMimeType(array $message): ?string
    {
        if (isset($message['video'])) return 'video/mp4';
        if (isset($message['document'])) return $message['document']['mime_type'] ?? 'application/octet-stream';
        if (isset($message['animation'])) return 'video/mp4';
        return null;
    }
}
