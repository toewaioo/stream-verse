<?php
// app/Providers/EventServiceProvider.php
namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\MovieViewed;
use App\Events\EpisodeViewed;
use App\Listeners\UpdateMovieViewCount;
use App\Listeners\UpdateEpisodeViewCount;
class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        // Auth Events
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        // UserRegistered::class => [
        //     SendWelcomeEmail::class,
        // ],

        // UserLoggedIn::class => [
        //     LogUserLogin::class,
        // ],

        // VipSubscriptionActivated::class => [
        //     SendVipActivationEmail::class,
        // ],

        // Content Events
        MovieViewed::class => [
            UpdateMovieViewCount::class,
        ],

        EpisodeViewed::class => [
            UpdateEpisodeViewCount::class,
        ],

        // ContentRated::class => [
        //     UpdateContentRatingStats::class,
        // ],

        // ContentWatchProgressUpdated::class => [
        //     UpdateTrendingContent::class,
        // ],

        // // Streaming Events
        // StreamStarted::class => [
        //     LogStreamStart::class,
        // ],

        // LinkHealthChecked::class => [
        //     UpdateLinkSuccessRate::class,
        //     SendLinkHealthAlert::class,
        // ],

        // // Admin Events
        // ContentAdded::class => [
        //     LogContentActivity::class,
        //     SendNewContentNotification::class,
        // ],

        // ContentUpdated::class => [
        //     LogContentActivity::class,
        // ],

        // VipKeysGenerated::class => [
        //     LogVipKeysGeneration::class,
        // ],
    ];

    public function boot(): void
    {
        //
    }

    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
