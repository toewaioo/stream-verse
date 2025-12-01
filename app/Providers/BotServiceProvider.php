<?php

namespace App\Providers;

use App\Handlers\CallbackQueryHandler;
use App\Handlers\MessageHandler;
use App\Repositories\AccessLogRepository;
use App\Repositories\SentMessageRepository;
use App\Repositories\VideoMappingRepository;
use App\Services\Telegram\MessageService;
use App\Services\Telegram\TelegramApiService;
use App\Services\Telegram\TokenGeneratorService;
use App\Services\Telegram\VideoService;
use Illuminate\Support\ServiceProvider;

class BotServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(TelegramApiService::class, function ($app) {
            return new TelegramApiService(config('telegram.bot_token'));
        });

        $this->app->singleton(MessageService::class, function ($app) {
            return new MessageService($app->make(TelegramApiService::class));
        });

        $this->app->singleton(VideoService::class, function ($app) {
            return new VideoService($app->make(TelegramApiService::class), $app->make(MessageService::class));
        });

        $this->app->singleton(TokenGeneratorService::class, function ($app) {
            return new TokenGeneratorService();
        });

        $this->app->singleton(VideoMappingRepository::class, function ($app) {
            return new VideoMappingRepository();
        });

        $this->app->singleton(AccessLogRepository::class, function ($app) {
            return new AccessLogRepository();
        });

        $this->app->singleton(SentMessageRepository::class, function ($app) {
            return new SentMessageRepository();
        });

        $this->app->singleton(MessageHandler::class, function ($app) {
            return new MessageHandler(
                $app->make(VideoService::class),
                $app->make(MessageService::class),
                $app->make(VideoMappingRepository::class),
                $app->make(AccessLogRepository::class),
                $app->make(SentMessageRepository::class),
                $app->make(TokenGeneratorService::class),
                config('telegram.admin_ids', []),
                config('telegram.base_url', 'https://t.me/cineversemmbot?start=')
            );
        });

        $this->app->singleton(CallbackQueryHandler::class, function ($app) {
            return new CallbackQueryHandler(
                $app->make(MessageHandler::class),
                $app->make(MessageService::class),
                $app->make(TelegramApiService::class)
            );
        });
    }
}
