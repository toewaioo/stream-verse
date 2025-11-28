<?php
// app/Http/Resources/AnalyticsResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnalyticsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'dashboard_stats' => $this->when(isset($this['dashboard_stats']), $this['dashboard_stats']),
            'trending_movies' => MovieResource::collection($this->when(isset($this['trending_movies']), $this['trending_movies'] ?? [])),
            'trending_series' => SeriesResource::collection($this->when(isset($this['trending_series']), $this['trending_series'] ?? [])),
            'monthly_growth' => $this->when(isset($this['monthly_growth']), $this['monthly_growth']),
            'user_activity' => $this->when(isset($this['user_activity']), $this['user_activity']),
            'content_performance' => $this->when(isset($this['content_performance']), $this['content_performance']),
            'genre_distribution' => $this->when(isset($this['genre_distribution']), $this['genre_distribution']),
            'retention_metrics' => $this->when(isset($this['retention_metrics']), $this['retention_metrics']),
            'vip_metrics' => $this->when(isset($this['vip_metrics']), $this['vip_metrics']),
            'link_statistics' => $this->when(isset($this['link_statistics']), $this['link_statistics']),
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
            'message' => 'Analytics data retrieved successfully',
        ];
    }
}
