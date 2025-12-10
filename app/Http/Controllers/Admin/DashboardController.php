<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Movie;
use App\Models\Person;
use App\Models\Review;
use App\Models\Series;
use App\Models\User;
use App\Models\VipSubscription;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Cache duration in seconds
    protected const CACHE_DURATION = 300; // 5 minutes

    public function index(\Illuminate\Http\Request $request)
    {
        $range = $request->input('range', '30d');
        $cacheKey = 'admin_dashboard_' . $range;

        // Try to get cached data
        $data = Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($range) {
            return $this->getDashboardData($range);
        });

        return Inertia::render('Admin/Dashboard', $data);
    }

    /**
     * Get dashboard data with caching strategy
     */
    private function getDashboardData(string $range): array
    {
        $days = match ($range) {
            '7d' => 7,
            '30d' => 30,
            '90d' => 90,
            '1y' => 365,
            default => 30,
        };

        $startDate = now()->subDays($days);
        $previousStartDate = now()->subDays($days * 2);

        // Use separate cache keys for different data segments
        $segmentedData = Cache::remember(
            'dashboard_segmented_' . $range,
            $this->getSegmentedCacheDuration($days),
            function () use ($startDate, $previousStartDate, $days) {
                return $this->getSegmentedData($startDate, $previousStartDate, $days);
            }
        );

        // Always fetch recent/popular data fresh (shorter cache or no cache)
        $freshData = Cache::remember(
            'dashboard_fresh_data_' . now()->format('Y-m-d_H-i'),
            60, // 1 minute cache for fresh data
            function () {
                return [
                    'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'created_at', 'avatar_url']),
                    'popular_movies' => Movie::orderByDesc('view_count')->take(5)->get(['id', 'title', 'view_count', 'poster_url']),
                    'popular_series' => Series::orderByDesc('view_count')->take(5)->get(['id', 'title', 'view_count', 'poster_url']),
                ];
            }
        );

        // Prepare final stats
        $stats = [
            'movies' => [
                'value' => $segmentedData['counts']['movies']['total'] ?? 0,
                'growth' => $this->calculateGrowth(
                    $segmentedData['counts']['movies']['current'] ?? 0,
                    $segmentedData['counts']['movies']['previous'] ?? 0
                ),
                'trend' => ($segmentedData['counts']['movies']['current'] ?? 0) >= ($segmentedData['counts']['movies']['previous'] ?? 0) ? 'up' : 'down'
            ],
            'series' => [
                'value' => $segmentedData['counts']['series']['total'] ?? 0,
                'growth' => $this->calculateGrowth(
                    $segmentedData['counts']['series']['current'] ?? 0,
                    $segmentedData['counts']['series']['previous'] ?? 0
                ),
                'trend' => ($segmentedData['counts']['series']['current'] ?? 0) >= ($segmentedData['counts']['series']['previous'] ?? 0) ? 'up' : 'down'
            ],
            'genres' => [
                'value' => $segmentedData['counts']['genres']['total'] ?? 0,
                'growth' => $this->calculateGrowth(
                    $segmentedData['counts']['genres']['current'] ?? 0,
                    $segmentedData['counts']['genres']['previous'] ?? 0
                ),
                'trend' => ($segmentedData['counts']['genres']['current'] ?? 0) >= ($segmentedData['counts']['genres']['previous'] ?? 0) ? 'up' : 'down'
            ],
            'persons' => [
                'value' => $segmentedData['counts']['persons']['total'] ?? 0,
                'growth' => $this->calculateGrowth(
                    $segmentedData['counts']['persons']['current'] ?? 0,
                    $segmentedData['counts']['persons']['previous'] ?? 0
                ),
                'trend' => ($segmentedData['counts']['persons']['current'] ?? 0) >= ($segmentedData['counts']['persons']['previous'] ?? 0) ? 'up' : 'down'
            ],
            'users' => [
                'value' => $segmentedData['counts']['users']['total'] ?? 0,
                'growth' => $this->calculateGrowth(
                    $segmentedData['counts']['users']['current'] ?? 0,
                    $segmentedData['counts']['users']['previous'] ?? 0
                ),
                'trend' => ($segmentedData['counts']['users']['current'] ?? 0) >= ($segmentedData['counts']['users']['previous'] ?? 0) ? 'up' : 'down'
            ],
            'reviews' => [
                'value' => $segmentedData['counts']['reviews']['total'] ?? 0,
                'growth' => $this->calculateGrowth(
                    $segmentedData['counts']['reviews']['current'] ?? 0,
                    $segmentedData['counts']['reviews']['previous'] ?? 0
                ),
                'trend' => ($segmentedData['counts']['reviews']['current'] ?? 0) >= ($segmentedData['counts']['reviews']['previous'] ?? 0) ? 'up' : 'down'
            ],
            'total_views' => [
                'value' => $segmentedData['views']->total_views ?? 0,
                'growth' => 0,
                'trend' => 'neutral'
            ],
            'active_vip' => [
                'value' => $segmentedData['active_vip'] ?? 0,
                'growth' => 0,
                'trend' => 'neutral'
            ],
            'recent_users' => $freshData['recent_users'],
            'popular_movies' => $freshData['popular_movies'],
            'popular_series' => $freshData['popular_series'],
        ];

        return [
            'stats' => $stats,
            'charts' => [
                'userGrowth' => $segmentedData['user_growth'],
                'contentDistribution' => $segmentedData['content_distribution'],
                'topGenres' => $segmentedData['top_genres'],
            ],
            'filters' => [
                'range' => $range,
            ]
        ];
    }

    /**
     * Get segmented data with different cache strategies
     */
    private function getSegmentedData($startDate, $previousStartDate, $days): array
    {
        return [
            'counts' => $this->getModelCounts($startDate, $previousStartDate),
            'views' => $this->getTotalViews(),
            'active_vip' => $this->getActiveVipCount(),
            'user_growth' => $this->getUserGrowthData($startDate, $days),
            'content_distribution' => $this->getContentDistribution(),
            'top_genres' => $this->getTopGenres(),
        ];
    }

    /**
     * Get cache duration based on time range
     */
    private function getSegmentedCacheDuration(int $days): int
    {
        // Longer cache for longer time ranges
        return match (true) {
            $days <= 7 => 60, // 1 minute for 7 days
            $days <= 30 => 180, // 3 minutes for 30 days
            $days <= 90 => 300, // 5 minutes for 90 days
            default => 600, // 10 minutes for 1 year
        };
    }

    /**
     * Get counts for all models in a single optimized query
     */
    private function getModelCounts($startDate, $previousStartDate): array
    {
        $models = [
            'movies' => ['table' => 'movies', 'model' => Movie::class],
            'series' => ['table' => 'series', 'model' => Series::class],
            'genres' => ['table' => 'genres', 'model' => Genre::class],
            'persons' => ['table' => 'persons', 'model' => Person::class],
            'users' => ['table' => 'users', 'model' => User::class],
            'reviews' => ['table' => 'reviews', 'model' => Review::class],
        ];

        $counts = [];

        foreach ($models as $key => $config) {
            $model = $config['model'];
            $table = $config['table'];

            // Check if table has created_at column
            $hasCreatedAt = DB::getSchemaBuilder()->hasColumn($table, 'created_at');

            if ($hasCreatedAt) {
                // Use conditional aggregation for a single query
                $result = DB::table($table)
                    ->selectRaw('
                        COUNT(*) as total,
                        SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) as current_period,
                        SUM(CASE WHEN created_at >= ? AND created_at < ? THEN 1 ELSE 0 END) as previous_period
                    ', [$startDate, $previousStartDate, $startDate])
                    ->first();

                $counts[$key] = [
                    'total' => $result->total ?? 0,
                    'current' => $result->current_period ?? 0,
                    'previous' => $result->previous_period ?? 0
                ];
            } else {
                // For tables without created_at
                $counts[$key] = [
                    'total' => $model::count(),
                    'current' => 0,
                    'previous' => 0
                ];
            }
        }

        return $counts;
    }

    /**
     * Get total views with caching
     */
    private function getTotalViews(): object
    {
        return Cache::remember('dashboard_total_views', 300, function () {
            return DB::table('movies')
                ->select(
                    DB::raw('COALESCE(SUM(view_count), 0) as movie_views'),
                    DB::raw('(SELECT COALESCE(SUM(view_count), 0) FROM series) as series_views')
                )
                ->addSelect(DB::raw('COALESCE(SUM(view_count), 0) + (SELECT COALESCE(SUM(view_count), 0) FROM series) as total_views'))
                ->first();
        });
    }

    /**
     * Get active VIP count with caching
     */
    private function getActiveVipCount(): int
    {
        return Cache::remember('dashboard_active_vip', 300, function () {
            return VipSubscription::active()->count();
        });
    }

    /**
     * Get user growth data with optimized query
     */
    private function getUserGrowthData($startDate, $days)
    {
        $cacheKey = 'dashboard_user_growth_' . $startDate->format('Y-m-d') . '_' . $days;

        return Cache::remember($cacheKey, 300, function () use ($startDate, $days) {
            $groupBy = $days > 90 ? 'month' : 'day';
            $driver = DB::connection()->getDriverName();

            if ($driver === 'sqlite') {
                $dateFormat = $groupBy === 'month' ? '%Y-%m' : '%Y-%m-%d';
                $dateSelect = "strftime('$dateFormat', created_at) as date_group";
            } elseif ($driver === 'pgsql') {
                $dateFormat = $groupBy === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';
                $dateSelect = "to_char(created_at, '$dateFormat') as date_group";
            } else {
                $dateFormat = $groupBy === 'month' ? '%Y-%m' : '%Y-%m-%d';
                $dateSelect = "DATE_FORMAT(created_at, '$dateFormat') as date_group";
            }

            return User::select(
                DB::raw('count(id) as count'),
                DB::raw($dateSelect),
                DB::raw('MAX(created_at) as date')
            )
                ->where('created_at', '>=', $startDate)
                ->groupBy('date_group')
                ->orderBy('date_group')
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->date,
                        'users' => $item->count,
                    ];
                });
        });
    }

    /**
     * Get content distribution with caching
     */
    private function getContentDistribution(): array
    {
        return Cache::remember('dashboard_content_distribution', 300, function () {
            $movieCount = Movie::count();
            $seriesCount = Series::count();

            return [
                ['name' => 'Movies', 'value' => $movieCount],
                ['name' => 'Series', 'value' => $seriesCount],
            ];
        });
    }

    /**
     * Get top genres with caching
     */
    private function getTopGenres(): array
    {
        return Cache::remember('dashboard_top_genres', 300, function () {
            return DB::table('genres')
                ->select(
                    'genres.name',
                    DB::raw('
                        COALESCE((SELECT COUNT(*) FROM genre_movie WHERE genre_id = genres.id), 0) +
                        COALESCE((SELECT COUNT(*) FROM genre_series WHERE genre_id = genres.id), 0) as total_count
                    ')
                )
                ->orderByDesc('total_count')
                ->limit(5)
                ->get()
                ->map(function ($genre) {
                    return [
                        'name' => $genre->name,
                        'count' => $genre->total_count,
                    ];
                })
                ->values()
                ->toArray();
        });
    }

    /**
     * Calculate growth percentage
     */
    private function calculateGrowth($current, $previous): float
    {
        if ($previous > 0) {
            return round((($current - $previous) / $previous) * 100, 1);
        } elseif ($current > 0) {
            return 100.0;
        }

        return 0.0;
    }

    /**
     * Clear dashboard cache (call this when data changes)
     */
    public static function clearCache(): void
    {
        $ranges = ['7d', '30d', '90d', '1y'];

        foreach ($ranges as $range) {
            Cache::forget('admin_dashboard_' . $range);
            Cache::forget('dashboard_segmented_' . $range);
        }

        // Clear all related cache keys
        Cache::forget('dashboard_total_views');
        Cache::forget('dashboard_active_vip');
        Cache::forget('dashboard_content_distribution');
        Cache::forget('dashboard_top_genres');

        // Clear fresh data cache by pattern (since it has timestamp)
        $keys = Cache::get('cache_keys', []);
        foreach ($keys as $key) {
            if (
                str_starts_with($key, 'dashboard_fresh_data_') ||
                str_starts_with($key, 'dashboard_user_growth_')
            ) {
                Cache::forget($key);
            }
        }
    }
}
