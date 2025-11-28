<?php
// app/Listeners/UpdateMovieViewCount.php
namespace App\Listeners;

use App\Events\MovieViewed;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateMovieViewCount implements ShouldQueue
{
    public function handle(MovieViewed $event): void
    {
        $event->movie->incrementViewCount('view_count');
    }
}
