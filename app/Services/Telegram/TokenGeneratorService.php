<?php

namespace App\Services\Telegram;

use App\Models\VideoMapping;

class TokenGeneratorService
{
    public function generate(): string
    {
        do {
            $token = bin2hex(random_bytes(16));
            $exists = VideoMapping::where('token', $token)->exists();
        } while ($exists);

        return $token;
    }

    public function encode(string $token): string
    {
        return base64_encode($token);
    }

    public function decode(string $encodedToken): string
    {
        $decoded = base64_decode($encodedToken, true);
        if ($decoded === false) {
            throw new \Exception("Invalid token format");
        }
        return $decoded;
    }
}