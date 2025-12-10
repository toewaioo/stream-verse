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
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $range = $request->input('range', '30d');
        $days = match ($range) {
            '7d' => 7,
            '30d' => 30,
            '90d' => 90,
            '1y' => 365,
            default => 30,
        };

        $startDate = now()->subDays($days);
        $previousStartDate = now()->subDays($days * 2);

        // Helper to calculate stats with growth
        $getStat = function ($model) use ($startDate, $previousStartDate, $days) {
            $currentCount = $model::count(); // Total count (all time)
            
            // For growth, we look at records created in the current period vs previous period
            $currentPeriodCount = $model::where('created_at', '>=', $startDate)->count();
            $previousPeriodCount = $model::where('created_at', '>=', $previousStartDate)
                ->where('created_at', '<', $startDate)
                ->count();

            $growth = 0;
            if ($previousPeriodCount > 0) {
                $growth = (($currentPeriodCount - $previousPeriodCount) / $previousPeriodCount) * 100;
            } elseif ($currentPeriodCount > 0) {
                $growth = 100; // 100% growth if starting from 0
            }

            return [
                'value' => $currentCount,
                'growth' => round($growth, 1),
                'trend' => $growth >= 0 ? 'up' : 'down',
            ];
        };

        // Basic Stats with Growth
        $stats = [
            'movies' => $getStat(Movie::class),
            'series' => $getStat(Series::class),
            'genres' => $getStat(Genre::class),
            'persons' => $getStat(Person::class),
            'users' => $getStat(User::class),
            'reviews' => $getStat(Review::class),
            // Total views doesn't track "created_at", so we just return the sum without growth for now
            // Or we could track view history if we had a table for it. For now, just value.
            'total_views' => [
                'value' => Movie::sum('view_count') + Series::sum('view_count'),
                'growth' => 0,
                'trend' => 'neutral'
            ],
            'active_vip' => [
                'value' => VipSubscription::active()->count(),
                'growth' => 0, // Complex to calculate without history table
                'trend' => 'neutral'
            ],
            'recent_users' => User::latest()->take(5)->get(),
            'popular_movies' => Movie::orderByDesc('view_count')->take(5)->get(),
            'popular_series' => Series::orderByDesc('view_count')->take(5)->get(),
        ];

        // Chart Data: User Growth
        // Group by day for short periods, month for long periods
        $groupBy = $days > 90 ? 'month' : 'day';
        $dateFormat = $groupBy === 'month' ? '%Y-%m' : '%Y-%m-%d';
        
        $userGrowth = User::select(
            DB::raw('count(id) as count'),
            DB::raw("DATE_FORMAT(created_at, '$dateFormat') as date_group"),
            DB::raw('MAX(created_at) as date')
        )
            ->where('created_at', '>=', $startDate)
            ->groupBy('date_group')
            ->orderBy('date_group')
            ->get()
            ->map(function ($item) use ($groupBy) {
                return [
                    'name' => $groupBy === 'month' ? $item->date : $item->date,
                    'users' => $item->count,
                ];
            });

        // 2. Content Distribution (Static for now)
        $contentDistribution = [
            ['name' => 'Movies', 'value' => Movie::count()],
            ['name' => 'Series', 'value' => Series::count()],
        ];

        // 3. Top Genres
        $topGenres = Genre::withCount(['movies', 'series'])
            ->get()
            ->map(function ($genre) {
                return [
                    'name' => $genre->name,
                    'count' => $genre->movies_count + $genre->series_count,
                ];
            })
            ->sortByDesc('count')
            ->take(5)
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'charts' => [
                'userGrowth' => $userGrowth,
                'contentDistribution' => $contentDistribution,
                'topGenres' => $topGenres,
            ],
            'filters' => [
                'range' => $range,
            ]
        ]);
    }
}
