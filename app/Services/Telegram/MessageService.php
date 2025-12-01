<?php

namespace App\Services\Telegram;

use Illuminate\Support\Facades\Log;

class MessageService
{
    private $telegramApi;
    private $logger;

    public function __construct(TelegramApiService $telegramApi)
    {
        $this->telegramApi = $telegramApi;
    }

    public function sendPhoto(int $chatId, string $imageUrl, string $text, string $parseMode = 'Markdown', ?array $replyMarkup = null): array
    {
        $data = [
            'chat_id' => $chatId,
            'caption' => $text,
            'photo' => $imageUrl,
            'parse_mode' => $parseMode
        ];

        if ($replyMarkup) {
            $data['reply_markup'] = json_encode($replyMarkup);
        }

        try {
            return $this->telegramApi->sendPhoto($data);
        } catch (\Exception $e) {
            Log::error("Failed to send photo: " . $e->getMessage(), ['chat_id' => $chatId]);
            throw $e;
        }
    }

    public function editMessageText(int $chatId, int $message_id, string $text, string $parseMode = 'Markdown', ?array $replyMarkup = null)
    {
        $data = [
            'chat_id' => $chatId,
            'message_id' => $message_id,
            'text' => $text,
            'parse_mode' => $parseMode
        ];

        if ($replyMarkup) {
            $data['reply_markup'] = json_encode($replyMarkup);
        }

        try {
            return $this->telegramApi->editMessageText($data);
        } catch (\Exception $e) {
            Log::error("Failed to edit message: " . $e->getMessage(), ['chat_id' => $chatId]);
            throw $e;
        }
    }

    public function sendMessage(int $chatId, string $text, string $parseMode = 'Markdown', ?array $replyMarkup = null): array
    {
        $data = [
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => $parseMode
        ];

        if ($replyMarkup) {
            $data['reply_markup'] = json_encode($replyMarkup);
        }

        try {
            return $this->telegramApi->sendMessage($data);
        } catch (\Exception $e) {
            Log::error("Failed to send message: " . $e->getMessage(), ['chat_id' => $chatId]);
            throw $e;
        }
    }

    public function deleteMessage(int $chatId, int $messageId): array
    {
        return $this->telegramApi->deleteMessage([
            'chat_id' => $chatId,
            'message_id' => $messageId
        ]);
    }

    public function sendChatAction(int $chatId, string $action): array
    {
        return $this->telegramApi->sendChatAction([
            'chat_id' => $chatId,
            'action' => $action
        ]);
    }
}
