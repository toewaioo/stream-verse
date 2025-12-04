<?php

namespace App\Handlers;

use App\Services\Telegram\VideoService;
use App\Services\Telegram\MessageService;
use App\Services\Telegram\TokenGeneratorService;
use App\Repositories\VideoMappingRepository;
use App\Repositories\AccessLogRepository;
use App\Repositories\SentMessageRepository;
use Illuminate\Support\Facades\Log;

class MessageHandler
{
    private $videoService;
    private $messageService;
    private $videoMappingRepository;
    private $accessLogRepository;
    private $sentMessageRepository;
    private $tokenGenerator;
    private $adminIds;
    private $baseUrl;

    public function __construct(
        VideoService $videoService,
        MessageService $messageService,
        VideoMappingRepository $videoMappingRepository,
        AccessLogRepository $accessLogRepository,
        SentMessageRepository $sentMessageRepository,
        TokenGeneratorService $tokenGenerator,
        array $adminIds,
        string $baseUrl = 'https://t.me/cineversemmbot?start='
    ) {
        $this->videoService = $videoService;
        $this->messageService = $messageService;
        $this->videoMappingRepository = $videoMappingRepository;
        $this->accessLogRepository = $accessLogRepository;
        $this->sentMessageRepository = $sentMessageRepository;
        $this->tokenGenerator = $tokenGenerator;
        $this->adminIds = $adminIds;
        $this->baseUrl = $baseUrl;
    }

    public function handle(array $message): void
    {
        $chatId = $message['chat']['id'];
        $userId = $message['from']['id'];
        $text = $message['text'] ?? '';

        $isAdmin = $this->isAdmin($userId);

        Log::info("User {$userId} (Admin: {$isAdmin}) sent: " . substr($text, 0, 100), ['chat_id' => $chatId]);

        if (strpos($text, '/start') === 0) {
            $this->handleStartCommand($chatId, $userId, $text, $message['from']);
        } elseif (strpos($text, '/add') === 0 && $isAdmin) {
            $this->handleAddCommand($chatId);
        } elseif (strpos($text, '/list') === 0 && $isAdmin) {
            $this->handleListCommand($chatId, 1, false, $chatId);
        } elseif (strpos($text, '/stats') === 0 && $isAdmin) {
            $this->handleStatsCommand($chatId);
        } elseif (strpos($text, '/broadcast') === 0 && $isAdmin) {
            $this->handleBroadcastCommand($chatId, $text);
        } elseif (strpos($text, '/users') === 0 && $isAdmin) {
            $this->handleUserStats($chatId);
        } elseif (strpos($text, '/help') === 0) {
            $this->handleHelpCommand($chatId, $isAdmin);
        } else {
            if ($isAdmin && $this->isVideoMessage($message)) {
                $this->handleVideoForward($chatId, $message);
            } elseif (!$isAdmin) {
                $this->welcomeMessage($chatId);
            } else {
                $this->handleStartCommand($chatId, $userId, $text, $message['from']);
            }
        }
    }

    public function welcomeMessage(int $chatId): void
    {
        $welcomeText = "🤖 Welcome to Video Sender Bot!\n\n" .
            "Join our channel for updates and movies!\n\n" .
            "Use deep links provided by admins to access videos.\n\n" .
            "Need help? Contact the administrator.";
        $imageUrl = "https://iili.io/KZAx9ix.png";

        $replyMarkup = [
            'inline_keyboard' => [
                [
                    [
                        'text' => '👉 Join Movie Channel',
                        'url' => 'https://t.me/cineversemm1'
                    ],
                    [
                        'text' => '📢 Updates Channel',
                        'url' => 'https://t.me/cineversemm2'
                    ]
                ],
                [[
                    'text' => '👮 Contact Admin',
                    'url' => 'https://t.me/twowt2'
                ]],
                [
                    ['text' => '❓ Help', 'callback_data' => 'help']
                ]
            ],
        ];

        try {
            $this->messageService->sendPhoto($chatId, $imageUrl, $welcomeText, 'HTML', $replyMarkup);
        } catch (\Exception $e) {
            Log::error("Failed to send welcome image: " . $e->getMessage(), ['chat_id' => $chatId]);
            $this->messageService->sendMessage($chatId, $welcomeText, 'HTML', $replyMarkup);
        }
    }

    private function isAdmin(int $userId): bool
    {
        return in_array($userId, $this->adminIds);
    }

    private function isVideoMessage(array $message): bool
    {
        return isset($message['video']) ||
            isset($message['document']) ||
            (isset($message['forward_from_chat']) && isset($message['forward_from_message_id']));
    }

    private function handleStartCommand(int $chatId, int $userId, string $text, array $userInfo): void
    {
        $parts = explode(' ', $text);
        $this->messageService->sendChatAction($chatId, "typing");

        if (count($parts) < 2) {
            $this->welcomeMessage($chatId);
            return;
        }

        $token = $parts[1];
        $this->processDeepLink($chatId, $userId, $token, $userInfo);
    }

    public function processDeepLink(int $chatId, int $userId, string $token, array $userInfo): void
    {
        try {
            Log::info("Processing deep link with token: " . $token, ['chat_id' => $chatId]);
            $this->messageService->sendChatAction($chatId, "upload_video");

            $decodedToken = $this->tokenGenerator->decode($token);
            $mapping = $this->videoMappingRepository->findByToken($decodedToken);

            if (!$mapping) {
                $this->messageService->sendMessage($chatId, "❌ Video not found or link has expired.");
                return;
            }

            $this->videoMappingRepository->incrementAccessCount($mapping['id']);

            $this->accessLogRepository->logAccess([
                'video_mapping_id' => $mapping['id'],
                'user_id' => $userId,
                'user_first_name' => $userInfo['first_name'] ?? '',
                'user_username' => $userInfo['username'] ?? '',
                'success' => true,
                'error_message' => null
            ]);

            $processingMsg = $this->messageService->sendMessage($chatId, "🔄 သင့်ရုပ်ရှင်ကိုပို့နေပါသည်။ခနစောင့်ပါ...");
            $warningMsg = "\n<b>❗️❗️❗️အရေးကြီးပါသည်❗️❗️❗️</b>\n\nဤရုပ်ရှင်ဖိုင်များ/ဗီဒီယိုများကို 🫥 <i>မူပိုင်ခွင့်ပြဿနာများကြောင့်</i> <u>၅ မိနစ်အတွင်း</u> ဖျက်သိမ်းမည်ဖြစ်ပါသည်။\n\nကျေးဇူးပြု၍ ဤဖိုင်များအားလုံးကို <b>သင်၏ Saved Messages သို့ ပေးပို့ထားပြီး</b> ထိုနေရာတွင် ဇာတ်ကားများကို ဒေါင်းယူ ကြည့်ရှုပါ။\n\n<b>❗️❗️❗️IMPORTANT NOTICE❗️❗️❗️</b>\n\nThese movie files/videos will be <u>deleted within 5 minutes</u> 🫥 <i>due to copyright issues</i>.\n\nPlease <b>forward all files/videos to your Saved Messages</b> and watch or download them from there.";

            $mapping['title'] .= $warningMsg;
            $keyboard = [
                'inline_keyboard' => [
                    [
                        [
                            'text' => 'Open Mini App',
                            'web_app' => [
                                'url' => 'https://stream-verse-mocha.vercel.app'
                            ],
                        ]
                    ]
                ]
            ];
            $result = $this->videoService->sendVideoToUser($chatId, $mapping, $keyboard);

            if (isset($result['ok']) && $result['ok'] === true) {
                if (isset($processingMsg['result']['message_id'])) {
                    $this->messageService->deleteMessage($chatId, $processingMsg['result']['message_id']);
                }

                $this->sentMessageRepository->trackMessage([
                    'video_mapping_id' => $mapping['id'],
                    'user_id' => $userId,
                    'chat_id' => $chatId,
                    'message_id' => $result['result']['message_id'],
                    'deep_link' => $mapping['token']
                ]);

                Log::info("Video sent successfully to user: " . $userId, ['chat_id' => $chatId]);
            } else {
                $error = $result['description'] ?? 'Unknown error';
                $this->messageService->sendMessage($chatId, "❌ Failed to send video: " . $error);
                Log::error("Send video failed: " . $error, ['chat_id' => $chatId]);
            }
        } catch (\Exception $e) {
            $this->messageService->sendMessage($chatId, "❌ Error: " . $e->getMessage());
            Log::error("Deep link exception: " . $e->getMessage(), ['chat_id' => $chatId]);
        }
    }


    private function handleVideoForward(int $chatId, array $message): void
    {
        Log::info("Processing video forward from admin", ['chat_id' => $chatId]);

        try {
            if (isset($message['forward_from_chat']) && isset($message['forward_from_message_id'])) {
                $sourceChatId = $message['forward_from_chat']['id'];
                $sourceMessageId = $message['forward_from_message_id'];
            } else {
                $sourceChatId = $chatId;
                $sourceMessageId = $message['message_id'];
            }

            $fileInfo = $this->videoService->extractFileInfo($message);
            $warningMsg = "\n<b>❗️❗️❗️အရေးကြီးပါသည်❗️❗️❗️</b>\n\nဤရုပ်ရှင်ဖိုင်များ/ဗီဒီယိုများကို 🫥 <i>မူပိုင်ခွင့်ပြဿနာများကြောင့်</i> <u>၅ မိနစ်အတွင်း</u> ဖျက်သိမ်းမည်ဖြစ်ပါသည်။\n\nကျေးဇူးပြု၍ ဤဖိုင်များအားလုံးကို <b>သင်၏ Saved Messages သို့ ပေးပို့ထားပြီး</b> ထိုနေရာတွင် ဇာတ်ကားများကို ဒေါင်းယူ ကြည့်ရှုပါ။\n\n<b>❗️❗️❗️IMPORTANT NOTICE❗️❗️❗️</b>\n\nThese movie files/videos will be <u>deleted within 5 minutes</u> 🫥 <i>due to copyright issues</i>.\n\nPlease <b>forward all files/videos to your Saved Messages</b> and watch or download them from there.";

            $fileTitleForChannel = ($message['caption'] ?? ('Video ' . date('Y-m-d H:i:s')));
            $fileTitle = $fileTitleForChannel;
            $token = $this->tokenGenerator->generate();
            $mappingId = $this->videoMappingRepository->create([
                'title' => $fileTitle,
                'token' => $token,
                'chat_id' => $sourceChatId,
                'message_id' => $sourceMessageId,
                'file_id' => $fileInfo['file_id'],
                'file_type' => $fileInfo['file_type'],
                'file_size' => $fileInfo['file_size'],
                'duration' => $fileInfo['duration'],
                'mime_type' => $fileInfo['mime_type']
            ]);

            $deepLink = $this->tokenGenerator->encode($token);
            $fullDeepLink = $this->baseUrl . $deepLink;
            $keyboard = [
                'inline_keyboard' => [
                    [
                        [
                            'text' => '🔄 Forward လုပ်မည်။',
                            'callback_data' => 'forward_' . $token
                        ]
                    ]
                ]
            ];
            $this->messageService->sendMessage(
                $chatId,
                "✅ Video added successfully!\n\n" .
                    "🔗 Deep Link:\n\n" .
                    "<code>" . htmlspecialchars($fullDeepLink) . "</code>\n\n" .
                    "Share this link with users.",
                'HTML',
                $keyboard
            );

            //
            $keyboard = [
                'inline_keyboard' => [
                    [
                        [
                            'text' => 'Open Mini App',
                            'web_app' => [
                                'url' => 'https://stream-verse-mocha.vercel.app'
                            ],
                        ]
                    ]
                ]
            ];
            // Send to channel
            $this->videoService->sendVideoToUser("-1003205982815", [
                'chat_id' => $sourceChatId,
                'message_id' => $sourceMessageId,
                'file_id' => $fileInfo['file_id'],
                'file_type' => $fileInfo['file_type'],
                'title' => $fileTitleForChannel
            ], $keyboard);

            Log::info("New video mapping created with ID: " . $mappingId, ['chat_id' => $chatId]);
        } catch (\Exception $e) {
            $errorMsg = "❌ Error adding video: " . $e->getMessage();
            $this->messageService->sendMessage($chatId, $errorMsg);
            Log::error("Video forward error: " . $errorMsg, ['chat_id' => $chatId]);
        }
    }
    public function forwardToChannel(int $chatId, string $token): void
    {
        try {
            Log::info("Processing deep link with token: " . $token, ['chat_id' => $chatId]);
            $this->messageService->sendChatAction($chatId, "upload_video");

            $decodedToken = $this->tokenGenerator->decode($token);
            $mapping = $this->videoMappingRepository->findByToken($decodedToken);
            $keyboard = [
                'inline_keyboard' => [
                    [
                        [
                            'text' => 'Open Mini App',
                            'web_app' => [
                                'url' => 'https://stream-verse-mocha.vercel.app'
                            ],

                        ]
                    ]
                ]
            ];
            $this->videoService->sendVideoToUser("-1003153446702", $mapping, $keyboard);
        } catch (\Exception $e) {
            $this->messageService->sendMessage($chatId, "❌ Error: " . $e->getMessage());
            Log::error("Deep link exception: " . $e->getMessage(), ['chat_id' => $chatId]);
        }
    }


    private function handleAddCommand(int $chatId): void
    {
        $this->messageService->sendMessage(
            $chatId,
            "📹 How to add a video:\n\n" .
                "1. **Forward** any video from your private channel to this bot\n" .
                "2. Or **upload** a video directly to this bot\n\n" .
                "I'll automatically generate a deep link for it!"
        );
    }

    public function handleListCommand(int $chatId, int $page = 1, bool $isCallback = false, ?int $messageId = null): void
    {
        try {
            $limit = 5;
            $offset = ($page - 1) * $limit;

            $total = $this->videoMappingRepository->getActiveCount();
            if ($total == 0) {
                $this->messageService->sendMessage($chatId, "No videos added yet.");
                return;
            }

            $totalPages = ceil($total / $limit);
            $mappings = $this->videoMappingRepository->getPaginatedActive($limit, $offset);

            $message = "📊 <b>Video Library</b> (Page {$page}/{$totalPages})\n\n";
            $message .= "📹 Total Videos: {$total}\n\n";

            foreach ($mappings as $mapping) {
                $deepLink = $this->baseUrl . $this->tokenGenerator->encode($mapping['token']);
                $accessCount = $mapping['access_count'] ?? 0;
                $lastAccessed = $mapping['last_accessed'] ?
                    date('M j, Y', strtotime($mapping['last_accessed'])) : 'Never';

                $message .= "🎬 <b>Video ID:</b> #" . $mapping['id'] . "\n";
                $message .= "👁️ Views: {$accessCount} | Last: {$lastAccessed}\n";
                $message .= "📄 Title: " . htmlspecialchars(mb_strimwidth($mapping['title'], 0, 30, '...')) . "\n";
                $message .= "🔗 <code>{$deepLink}</code>\n";
                $message .= "⏰ Added: " . date('M j, Y', strtotime($mapping['created_at'])) . "\n\n";
            }

            $keyboard = $this->createPaginationKeyboard($page, $totalPages);
            $replyMarkup = ['inline_keyboard' => $keyboard];

            if ($isCallback && $messageId) {
                $this->messageService->editMessageText($chatId, $messageId, $message, 'HTML', $replyMarkup);
            } else {
                $this->messageService->sendMessage($chatId, $message, 'HTML', $replyMarkup);
            }
        } catch (\Exception $e) {
            $this->messageService->sendMessage($chatId, "❌ Error listing videos: " . $e->getMessage());
        }
    }

    private function createPaginationKeyboard(int $currentPage, int $totalPages): array
    {
        $keyboard = [];

        if ($totalPages > 1) {
            $row = [];
            if ($currentPage > 1) {
                $row[] = ['text' => '⬅️ Previous', 'callback_data' => 'list_page_' . ($currentPage - 1)];
            }

            $row[] = ['text' => "{$currentPage}/{$totalPages}", 'callback_data' => 'current_page'];

            if ($currentPage < $totalPages) {
                $row[] = ['text' => 'Next ➡️', 'callback_data' => 'list_page_' . ($currentPage + 1)];
            }
            $keyboard[] = $row;
        }

        $keyboard[] = [['text' => '❌ Close', 'callback_data' => 'close_list']];
        return $keyboard;
    }

    private function handleStatsCommand(int $chatId): void
    {
        try {
            $stats = $this->videoMappingRepository->getStatistics();

            $message = "📈 Bot Statistics:\n\n";
            $message .= "📹 Total Videos: {$stats['total_videos']}\n";
            $message .= "👥 Total Accesses: {$stats['total_accesses']}\n";
            $message .= "📊 Avg. Accesses: " . round($stats['avg_accesses'], 1) . "\n";
            $message .= "🔥 Most Popular: {$stats['max_accesses']} accesses\n";

            $this->messageService->sendMessage($chatId, $message);
        } catch (\Exception $e) {
            $this->messageService->sendMessage($chatId, "❌ Error getting stats: " . $e->getMessage());
        }
    }

    private function handleUserStats(int $chatId): void
    {
        try {
            $stats = $this->accessLogRepository->getUserStatistics();

            $message = "📈 Bot User Statistics:\n\n";
            $message .= "📹 Total Users: {$stats['total_users']}\n";
            $message .= "👥 Total Accesses: {$stats['total_accesses']}\n";
            $message .= "📊 Avg. Accesses: " . round($stats['avg_accesses'], 1) . "\n";
            $message .= "🔥 Most Popular: {$stats['max_accesses']} accesses\n";

            $this->messageService->sendMessage($chatId, $message);
        } catch (\Exception $e) {
            $this->messageService->sendMessage($chatId, "❌ Error getting user stats: " . $e->getMessage());
        }
    }

    private function handleBroadcastCommand(int $chatId, string $text): void
    {
        $message = trim(str_replace('/broadcast', '', $text));
        if (empty($message)) {
            $this->messageService->sendMessage($chatId, "Usage: /broadcast your message here");
            return;
        }

        $users = $this->accessLogRepository->getBroadcastUsers();
        $sent = 0;
        $failed = 0;

        foreach ($users as $user) {
            try {
                $this->messageService->sendMessage(
                    $user['user_id'],
                    "📢 \n{$message}\n",
                    'HTML'
                );
                $sent++;
                usleep(200000); // 200ms delay to avoid rate limits
            } catch (\Exception $e) {
                $failed++;
            }
        }

        $this->messageService->sendMessage(
            $chatId,
            "📊 Broadcast Complete!\n\n✅ Sent: {$sent}\n❌ Failed: {$failed}"
        );
    }

    public function handleHelpCommand(int $chatId, bool $isAdmin): void
    {
        $message = "🤖 Video Sender Bot Help\n\n";

        if ($isAdmin) {
            $message .= "👑 **Admin Commands:**\n";
            $message .= "/add - Show how to add videos\n";
            $message .= "/list - List recent videos\n";
            $message .= "/stats - Show statistics\n";
            $message .= "/users - Show user statistics\n";
            $message .= "/broadcast - Broadcast message to all users\n";
            $message .= "\n**To add videos:**\n";
            $message .= "1. Forward any video from your channel\n";
            $message .= "2. Or upload video directly to bot\n";
            $message .= "3. I'll generate a deep link automatically!\n";
        } else {
            $message .= "Use deep links provided by admins to access videos.\n";
            $message .= "Contact admin if you need video access.";
        }

        $this->messageService->sendMessage($chatId, $message);
    }
}
