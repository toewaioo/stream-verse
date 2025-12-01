<?php

namespace App\Http\Controllers;

use App\Models\SentMessage;
use App\Models\VideoMapping;
use App\Services\Telegram\TelegramApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CleanUpController extends Controller
{
    private $telegramApi;

    public function __construct(TelegramApiService $telegramApi)
    {
        $this->telegramApi = $telegramApi;
    }

    public function log($message)
    {
        echo "<br>[" . date('Y-m-d H:i:s') . "] " . $message . "\n</br>";
        Log::info($message);
    }

    /**
     * Main cleanup method for sent_messages table
     * Deletes Telegram messages and database records based on criteria
     */
    public function cleanupSentMessages(Request $request)
    {
        $min = $request->get('min', 5); // default 1 minute
        $limit = $request->get('limit', 100); // default 100 records

        $this->log("Starting sent_messages cleanup - older than {$min} minutes, limit: {$limit}");

        $stats = [
            'processed' => 0,
            'telegram_deleted' => 0,
            'db_records_deleted' => 0,
            'errors' => 0,
            'skipped' => 0
        ];

        try {
            // Get messages older than specified minutes
            $cutoff_date = now()->subMinutes($min);

            $messages = SentMessage::where('sent_at', '<', $cutoff_date)
                ->orderBy('sent_at', 'asc')
                ->limit($limit)
                ->get();

            $this->log("Found " . count($messages) . " messages to process");

            foreach ($messages as $message) {
                try {
                    $stats['processed']++;

                    // Step 1: Delete Telegram message
                    $telegram_deleted = $this->deleteTelegramMessage(
                        $message->chat_id,
                        $message->message_id
                    );

                    if ($telegram_deleted) {
                        $stats['telegram_deleted']++;
                        $this->resendMessage($message->chat_id, "သင်၏ ဗီဒီယိုကို ဖျက်လိုက်ပါပြီ။ပြန်လည်ရယူရန် <b> ပြန်လည်ရယူမည်။ </b> ခလုတ်ကိုနှိပ်ပါ။", $message->deep_link);
                    } else {
                        $stats['skipped']++;
                        // Continue anyway to delete DB record
                    }

                    // Step 2: Delete database record
                    $message->delete();
                    $stats['db_records_deleted']++;

                    $this->log("Successfully processed message ID: {$message->id} " .
                        "(Chat: {$message->chat_id}, Message: {$message->message_id})");

                    // Small delay to avoid rate limits
                    if ($stats['processed'] % 10 === 0) {
                        sleep(1);
                    }
                } catch (\Exception $e) {
                    $stats['errors']++;
                    $this->log("ERROR processing message ID: {$message->id} - " . $e->getMessage());
                }
            }

            // Clean up any orphaned video mappings
            //$orphaned_count = $this->cleanupOrphanedVideoMappings();
           // $stats['orphaned_video_mappings'] = $orphaned_count;

            $this->log("Cleanup completed: " . json_encode($stats));

            return response()->json([
                'status' => 'success',
                'message' => 'Cleanup completed successfully',
                'stats' => $stats
            ]);
        } catch (\Exception $e) {
            $this->log("FATAL ERROR in sent_messages cleanup: " . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'stats' => $stats
            ], 500);
        }
    }

    /**
     * Send reget message to user
     */
    private function resendMessage($chat_id, $text, $callback_data)
    {
        $keyboard = [
            'inline_keyboard' => [
                [
                    [
                        'text' => '🔄 ရုပ်ရှင်ပြန်လည်ရယူမည်။',
                        'callback_data' => 'resend_' . $callback_data
                    ]
                ]
            ]
        ];

        $data = [
            'chat_id' => $chat_id,
            'text' => $text,
            'parse_mode' => 'HTML',
            'reply_markup' => json_encode($keyboard)
        ];

        try {
            return $this->telegramApi->sendMessage($data);
        } catch (\Exception $e) {
            $this->log("Failed to send resend message to chat {$chat_id}: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Delete Telegram message with comprehensive error handling
     */
    private function deleteTelegramMessage($chat_id, $message_id)
    {
        try {
            $this->telegramApi->deleteMessage([
                'chat_id' => $chat_id,
                'message_id' => $message_id
            ]);
            return true;
        } catch (\Exception $e) {
            // Handle specific error cases
            $errorMessage = $e->getMessage();

            if (
                strpos($errorMessage, 'message to delete not found') !== false ||
                strpos($errorMessage, 'bad message') !== false ||
                strpos($errorMessage, 'message can\'t be deleted') !== false ||
                strpos($errorMessage, 'Bad Request: message to delete not found') !== false
            ) {
                $this->log("Message {$message_id} in chat {$chat_id} already deleted or can't be deleted");
                return true; // Consider it successfully handled
            }

            $this->log("Failed to delete Telegram message {$message_id} in chat {$chat_id}: {$errorMessage}");
            return false;
        }
    }

    /**
     * Clean up video mappings that have no sent messages
     */
    private function cleanupOrphanedVideoMappings()
    {
        try {
            $orphanedMappings = VideoMapping::whereDoesntHave('sentMessages')
                ->where('created_at', '<', now()->subDay()) // Only clean up old ones
                ->get();

            $deleted_count = 0;

            foreach ($orphanedMappings as $mapping) {
                $mapping->delete();
                $deleted_count++;
            }

            if ($deleted_count > 0) {
                $this->log("Cleaned up {$deleted_count} orphaned video mappings");
            }

            return $deleted_count;
        } catch (\Exception $e) {
            $this->log("Error cleaning up orphaned video mappings: " . $e->getMessage());
            return 0;
        }
    }

    /**
     * Get cleanup statistics
     */
    public function getStats(Request $request)
    {
        $min = $request->get('min', 1);
        $cutoff_date = now()->subMinutes($min);

        $stats = [
            'pending_cleanup' => SentMessage::where('sent_at', '<', $cutoff_date)->count(),
            'total_sent_messages' => SentMessage::count(),
            'total_video_mappings' => VideoMapping::count(),
            'orphaned_mappings' => VideoMapping::whereDoesntHave('sentMessages')
                ->where('created_at', '<', now()->subDay())
                ->count(),
            'cutoff_time' => $cutoff_date->format('Y-m-d H:i:s'),
            'current_time' => now()->format('Y-m-d H:i:s')
        ];

        return response()->json([
            'status' => 'success',
            'stats' => $stats
        ]);
    }

    /**
     * Manual cleanup trigger with parameters
     */
    public function manualCleanup(Request $request)
    {
        // You can add authentication here if needed
        // if (!auth()->check()) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $min = $request->get('minutes', 1);
        $limit = $request->get('limit', 100);

        return $this->cleanupSentMessages(new Request([
            'min' => $min,
            'limit' => $limit
        ]));
    }
}
