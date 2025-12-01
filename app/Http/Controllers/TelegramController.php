<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Handlers\CallbackQueryHandler;
use App\Handlers\MessageHandler;
class TelegramController extends Controller
{
    private $messageHandler;
    private $callbackQueryHandler;

    public function __construct(MessageHandler $messageHandler, CallbackQueryHandler $callbackQueryHandler)
    {
        $this->messageHandler = $messageHandler;
        $this->callbackQueryHandler = $callbackQueryHandler;
    }

    public function webhook(Request $request)
    {
        $input = $request->all();

        Log::info('Telegram webhook received', $input);

        try {
            if (isset($input['message'])) {
                $this->messageHandler->handle($input['message']);
            } elseif (isset($input['callback_query'])) {
                $this->callbackQueryHandler->handle($input['callback_query']);
            }

            return response()->json(['status' => 'ok']);
        } catch (\Exception $e) {
            Log::error('Telegram webhook error: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
