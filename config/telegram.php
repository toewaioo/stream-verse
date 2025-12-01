<?php

return [
    'bot_token' => env('TELEGRAM_BOT_TOKEN'),
    'admin_ids' => array_map('intval', explode(',', env('TELEGRAM_ADMIN_IDS', ''))),
    'base_url' => env('TELEGRAM_BASE_URL', 'https://t.me/cineversemmbot?start='),
    'channel_id' => env('TELEGRAM_CHANNEL_ID', '-1003153446702'),
];
