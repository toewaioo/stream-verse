<?php
// app/Http/Resources/WatchHistoryResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WatchHistoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'last_position_seconds' => $this->last_position_seconds,
            'duration_seconds' => $this->duration_seconds,
            'percent_watched' => (float) $this->percent_watched,
            'completed' => $this->completed,
            'content_type' => $this->movie_id ? 'movie' : 'episode',
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'episode' => new EpisodeResource($this->whenLoaded('episode')),
            'content' => $this->getContent(),
            'resume_time_formatted' => $this->getResumeTimeFormatted(),
            'time_remaining_formatted' => $this->getTimeRemainingFormatted(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function getContent()
    {
        if ($this->movie) {
            return new MovieResource($this->movie);
        }

        if ($this->episode) {
            return new EpisodeResource($this->episode);
        }

        return null;
    }

    private function getResumeTimeFormatted(): string
    {
        $minutes = floor($this->last_position_seconds / 60);
        $seconds = $this->last_position_seconds % 60;

        return sprintf("%02d:%02d", $minutes, $seconds);
    }

    private function getTimeRemainingFormatted(): string
    {
        $remaining = $this->duration_seconds - $this->last_position_seconds;
        $minutes = floor($remaining / 60);
        $seconds = $remaining % 60;

        return sprintf("%02d:%02d", $minutes, $seconds);
    }

    public function with($request)
    {
        return [
            'success' => true,
        ];
    }
}
