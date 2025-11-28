<?php
// app/Listeners/UpdateEpisodeViewCount.php
namespace App\Listeners;

use App\Events\EpisodeViewed;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateEpisodeViewCount implements ShouldQueue
{
    public function handle(EpisodeViewed $event): void
    {
        $event->episode->incrementViewCount('view_count');

        // Also update series view count
        if ($event->episode->season->series) {
            $event->episode->season->series->increment('view_count');
        }
    }
}
