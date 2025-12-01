<?php

namespace App\Handlers;

use App\Handlers\MessageHandler;
use App\Services\Telegram\MessageService;
use App\Services\Telegram\TelegramApiService;
use Illuminate\Support\Facades\Log;

class CallbackQueryHandler
{
    private $messageHandler;
    private $messageService;
    private $telegramApi;
    private $logger;

    public function __construct(
        MessageHandler $messageHandler,
        MessageService $messageService,
        TelegramApiService $telegramApi
    ) {
        $this->messageHandler = $messageHandler;
        $this->messageService = $messageService;
        $this->telegramApi = $telegramApi;
    }

    public function handle(array $callbackQuery): void
    {
        $chatId = $callbackQuery['message']['chat']['id'];
        $data = $callbackQuery['data'];
        $userInfo = $callbackQuery['from'];
        $userId = $userInfo['id'];
        $messageId = $callbackQuery['message']['message_id'];

        try {
            if (strpos($data, 'list_page_') === 0) {
                $page = intval(str_replace('list_page_', '', $data));
                $this->messageHandler->handleListCommand($chatId, $page, true, $messageId);
            } elseif ($data === 'close_list') {
                $this->telegramApi->deleteMessage([
                    'chat_id' => $chatId,
                    'message_id' => $messageId
                ]);
            } elseif (strpos($data, 'resend') === 0) {
                $deepLink = base64_encode(substr($data, 7));
                $this->handleResendCommand($chatId, $userId, $deepLink, $userInfo, $messageId);
            } elseif (strpos($data, 'forward') === 0) {
                $deepLink = base64_encode(substr($data, 8));
                $this->handleForesrdCommand($chatId, $userId, $deepLink, $userInfo, $messageId);
            } elseif ($data === 'help') {
                $this->messageHandler->handleHelpCommand($chatId, false);
            }

            $this->telegramApi->answerCallbackQuery([
                'callback_query_id' => $callbackQuery['id']
            ]);
        } catch (\Exception $e) {
            Log::error("Callback query error: " . $e->getMessage(), ['chat_id' => $chatId]);
        }
    }
    private function handleForesrdCommand(int $chatId, int $userId, string $deepLink, array $userInfo, int $messageId): void
    {
        $this->messageHandler->forwardToChannel($chatId, $deepLink);
    }

    private function handleResendCommand(int $chatId, int $userId, string $deepLink, array $userInfo, int $messageId): void
    {
        $this->messageService->deleteMessage($chatId, $messageId);
        $this->messageHandler->processDeepLink($chatId, $userId, $deepLink, $userInfo);
    }
}
