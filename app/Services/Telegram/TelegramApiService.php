<?php

namespace App\Services\Telegram;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramApiService
{
    private $botToken;

    public function __construct(string $botToken)
    {
        $this->botToken = $botToken;
    }

    private function makeRequest(string $method, array $data = [])
    {
        $url = "https://api.telegram.org/bot{$this->botToken}/{$method}";

        try {
            $response = Http::timeout(30)
                ->asForm()
                ->post($url, $data);

            return $response->json();
        } catch (\Exception $e) {
            Log::error("Telegram API Error: " . $e->getMessage());
            throw new \Exception("Telegram API Error: " . $e->getMessage());
        }
    }

    public function sendPhoto(array $data)
    {
        return $this->makeRequest('sendPhoto', $data);
    }

    public function sendMessage(array $data)
    {
        return $this->makeRequest('sendMessage', $data);
    }

    public function sendVideo(array $data)
    {
        return $this->makeRequest('sendVideo', $data);
    }

    public function sendDocument(array $data)
    {
        return $this->makeRequest('sendDocument', $data);
    }

    public function forwardMessage(array $data)
    {
        return $this->makeRequest('forwardMessage', $data);
    }

    public function deleteMessage(array $data)
    {
        return $this->makeRequest('deleteMessage', $data);
    }

    public function editMessageText(array $data)
    {
        return $this->makeRequest('editMessageText', $data);
    }

    public function sendChatAction(array $data)
    {
        return $this->makeRequest('sendChatAction', $data);
    }

    public function answerCallbackQuery(array $data)
    {
        return $this->makeRequest('answerCallbackQuery', $data);
    }
}
