<?php
// app/Providers/RepositoryServiceProvider.php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\MovieRepositoryInterface;
use App\Repositories\Interfaces\SeriesRepositoryInterface;
use App\Repositories\Interfaces\PersonRepositoryInterface;
use App\Repositories\Interfaces\StreamingRepositoryInterface;
use App\Repositories\Interfaces\RatingRepositoryInterface;
use App\Repositories\Interfaces\WatchHistoryRepositoryInterface;
use App\Repositories\Interfaces\VIPRepositoryInterface;
use App\Repositories\Eloquent\EloquentMovieRepository;
use App\Repositories\Eloquent\EloquentSeriesRepository;
use App\Repositories\Eloquent\EloquentPersonRepository;
use App\Repositories\Eloquent\EloquentStreamingRepository;
use App\Repositories\Eloquent\EloquentRatingRepository;
use App\Repositories\Eloquent\EloquentWatchHistoryRepository;
use App\Repositories\Eloquent\EloquentVIPRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MovieRepositoryInterface::class, EloquentMovieRepository::class);
        $this->app->bind(SeriesRepositoryInterface::class, EloquentSeriesRepository::class);
        $this->app->bind(PersonRepositoryInterface::class, EloquentPersonRepository::class);
        $this->app->bind(StreamingRepositoryInterface::class, EloquentStreamingRepository::class);
        $this->app->bind(RatingRepositoryInterface::class, EloquentRatingRepository::class);
        $this->app->bind(WatchHistoryRepositoryInterface::class, EloquentWatchHistoryRepository::class);
        $this->app->bind(VIPRepositoryInterface::class, EloquentVIPRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
