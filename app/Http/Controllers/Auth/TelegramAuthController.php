<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TelegramAuthController extends Controller
{
    public function handleCallback(Request $request)
    {
        $data = $request->all();
        $botToken = config('services.telegram.bot_token') ?? env('TELEGRAM_BOT_TOKEN');

        if (!$this->checkTelegramAuthorization($data, $botToken)) {
            return redirect()->route('login')->withErrors(['email' => 'Telegram authentication failed.']);
        }

        $telegramId = $data['id'];
        $username = $data['username'] ?? 'User';
        $firstName = $data['first_name'] ?? '';
        $lastName = $data['last_name'] ?? '';
        $name = trim("$firstName $lastName") ?: $username;
        $photoUrl = $data['photo_url'] ?? null;

        $user = User::where('telegram_id', $telegramId)->first();

        if (!$user) {
            // Create a new user
            // Since Telegram doesn't provide email, we generate a placeholder
            $email = "telegram_{$telegramId}@telegram.placeholder";
            
            // Check if a user with this placeholder email already exists (unlikely but safe)
            if (User::where('email', $email)->exists()) {
                 $email = "telegram_{$telegramId}_" . Str::random(5) . "@telegram.placeholder";
            }

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'telegram_id' => $telegramId,
                'password' => Hash::make(Str::random(16)), // Random password
                'avatar_url' => $photoUrl,
                'email_verified_at' => now(),
            ]);
        } else {
            // Update user info if needed
            if ($photoUrl && $user->avatar_url !== $photoUrl) {
                $user->update(['avatar_url' => $photoUrl]);
            }
        }

        Auth::login($user);

        return redirect()->intended(route('home'));
    }

    private function checkTelegramAuthorization($auth_data, $bot_token)
    {
        if (!isset($auth_data['hash'])) {
            return false;
        }

        $check_hash = $auth_data['hash'];
        unset($auth_data['hash']);
        
        $data_check_arr = [];
        foreach ($auth_data as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);
        $secret_key = hash('sha256', $bot_token, true);
        $hash = hash_hmac('sha256', $data_check_string, $secret_key);

        if (strcmp($hash, $check_hash) !== 0) {
            return false;
        }

        if ((time() - $auth_data['auth_date']) > 86400) {
            return false;
        }

        return true;
    }

    public function loginViaMiniApp(Request $request)
    {
        $initData = $request->input('initData');
        $botToken = config('services.telegram.bot_token') ?? env('TELEGRAM_BOT_TOKEN');

        if (!$initData || !$this->validateMiniAppInitData($initData, $botToken)) {
            return response()->json(['message' => 'Invalid Telegram data'], 401);
        }

        // Parse initData to get user info
        parse_str($initData, $data);
        $user_data = json_decode($data['user'], true);

        $telegramId = $user_data['id'];
        $username = $user_data['username'] ?? 'User';
        $firstName = $user_data['first_name'] ?? '';
        $lastName = $user_data['last_name'] ?? '';
        $name = trim("$firstName $lastName") ?: $username;
        $photoUrl = $user_data['photo_url'] ?? null;

        $user = User::where('telegram_id', $telegramId)->first();

        if (!$user) {
             // Create a new user
             // Since Telegram doesn't provide email, we generate a placeholder
             $email = "telegram_{$telegramId}@telegram.placeholder";
             
             // Check if a user with this placeholder email already exists (unlikely but safe)
             if (User::where('email', $email)->exists()) {
                  $email = "telegram_{$telegramId}_" . Str::random(5) . "@telegram.placeholder";
             }
 
             $user = User::create([
                 'name' => $name,
                 'email' => $email,
                 'telegram_id' => $telegramId,
                 'password' => Hash::make(Str::random(16)), // Random password
                 'avatar_url' => $photoUrl,
                 'email_verified_at' => now(),
             ]);
        } else {
             // Update user info if needed
             if ($photoUrl && $user->avatar_url !== $photoUrl) {
                 $user->update(['avatar_url' => $photoUrl]);
             }
        }

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json(['message' => 'Logged in successfully']);
    }

    private function validateMiniAppInitData($initData, $botToken)
    {
        parse_str($initData, $data);
        
        if (!isset($data['hash'])) {
            return false;
        }

        $check_hash = $data['hash'];
        unset($data['hash']);

        $data_check_arr = [];
        foreach ($data as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);
        
        $secret_key = hash_hmac('sha256', $botToken, "WebAppData", true);
        $hash = hash_hmac('sha256', $data_check_string, $secret_key);

        if (strcmp($hash, $check_hash) !== 0) {
            return false;
        }
        
        if (isset($data['auth_date']) && (time() - $data['auth_date']) > 86400) {
            return false;
        }

        return true;
    }
}
