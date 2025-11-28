<?php
// app/Events/EpisodeViewed.php
namespace App\Events;

use App\Models\Episode;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EpisodeViewed
{
    use Dispatchable, SerializesModels;

    public function __construct(public Episode $episode) {}
}
