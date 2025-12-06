<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use App\Http\Controllers\Api\StreamingController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\WatchHistoryController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\Admin\SeriesController as AdminSeriesController;
use App\Http\Controllers\Admin\PersonController as AdminPersonController;
use App\Http\Controllers\Admin\WatchLinkController;
use App\Http\Controllers\Admin\DownloadLinkController;
// use App\Http\Controllers\Admin\AdminVipController;
// use App\Http\Controllers\Admin\AnalyticsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TelegramController;
use App\Http\Controllers\CleanUpController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/telegram/webhook', [TelegramController::class, 'webhook']);
Route::get('/cleanup.php', [CleanUpController::class, 'cleanupSentMessages']);
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);
Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

// Public content routes (limited access)
Route::get('/movies/trending', [MovieController::class, 'trending']);
Route::get('/movies/search', [MovieController::class, 'search']);
Route::get('/movies/genre/{genreSlug}', [MovieController::class, 'byGenre']);
Route::get('/movies', [MovieController::class, 'index']);
// Route::get('/movies/{slug}', [MovieController::class, 'show']);
Route::get('/movies/{slug}/related', [MovieController::class, 'related']);

Route::get('/series/trending', [SeriesController::class, 'trending']);
Route::get('/series/search', [SeriesController::class, 'search']);
Route::get('/series', [SeriesController::class, 'index']);
Route::get('/series/{slug}', [SeriesController::class, 'show']);
Route::get('/series/{seriesSlug}/seasons/{seasonNumber}', [SeriesController::class, 'season']);
Route::get('/series/{seriesSlug}/seasons/{seasonNumber}/episodes/{episodeNumber}', [SeriesController::class, 'episode']);
//Route::get('/search/suggestions', [SearchController::class, 'suggestions']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/vip/redeem', [AuthController::class, 'redeemVip']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/password/change', [AuthController::class, 'changePassword']);

    // Movies routes
    // Route::get('/movies', [MovieController::class, 'index']);
    // Route::get('/movies/search', [MovieController::class, 'search']);
    // Route::get('/movies/genre/{genreSlug}', [MovieController::class, 'byGenre']);
    // Route::get('/movies/{slug}', [MovieController::class, 'show']);
    // Route::get('/movies/{slug}/related', [MovieController::class, 'related']);
    Route::get('/movies/{slug}/stream', [StreamingController::class, 'getMovieStreamingLinks']);

    // Series routes
    // Route::get('/series', [SeriesController::class, 'index']);
    // Route::get('/series/search', [SeriesController::class, 'search']);
    // Route::get('/series/{slug}', [SeriesController::class, 'show']);
    // Route::get('/series/{seriesSlug}/seasons/{seasonNumber}', [SeriesController::class, 'season']);
    // Route::get('/series/{seriesSlug}/seasons/{seasonNumber}/episodes/{episodeNumber}', [SeriesController::class, 'episode']);
    Route::get('/series/{seriesSlug}/seasons/{seasonNumber}/episodes/{episodeNumber}/stream', [StreamingController::class, 'getEpisodeStreamingLinks']);

    // Streaming routes
    Route::get('/stream/proxy/{linkId}', [StreamingController::class, 'proxyStream'])
        ->name('api.stream.proxy');
    Route::get('/download/proxy/{linkId}', [StreamingController::class, 'proxyDownload'])
        ->name('api.download.proxy');
    Route::get('/download/{type}/{slug}', [StreamingController::class, 'getDownloadLinks']);
    Route::post('/links/{linkId}/report', [StreamingController::class, 'reportBrokenLink']);
    Route::get('/links/{linkId}/alternatives', [StreamingController::class, 'getAlternativeLinks']);

    
    // Watch history routes
    Route::get('/watch-history', [WatchHistoryController::class, 'index']);
    Route::get('/watch-history/continue-watching', [WatchHistoryController::class, 'continueWatching']);
    Route::post('/watch-history/progress', [WatchHistoryController::class, 'updateProgress']);
    Route::post('/watch-history/clear', [WatchHistoryController::class, 'clearHistory']);
    Route::delete('/watch-history/{id}', [WatchHistoryController::class, 'removeFromHistory']);
    Route::post('/watch-history/{id}/complete', [WatchHistoryController::class, 'markAsCompleted']);
    Route::get('/watch-history/stats', [WatchHistoryController::class, 'getStats']);

    // Search routes
    // Route::get('/search', [SearchController::class, 'globalSearch']);
    // Route::get('/search/advanced', [SearchController::class, 'advancedSearch']);

    // // Persons routes
    // Route::get('/persons', [PersonController::class, 'index']);
    // Route::get('/persons/search', [PersonController::class, 'search']);
    // Route::get('/persons/{id}', [PersonController::class, 'show']);
    // Route::get('/persons/{id}/filmography', [PersonController::class, 'filmography']);

    // Admin routes for creating entities
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::post('/movies', [App\Http\Controllers\Admin\MovieController::class, 'store']);
        Route::post('/series', [App\Http\Controllers\Admin\SeriesController::class, 'store']);
        Route::post('/genres', [App\Http\Controllers\Admin\GenreController::class, 'store']);
        Route::post('/persons', [App\Http\Controllers\Admin\PersonController::class, 'store']);
        Route::post('/download-links', [App\Http\Controllers\Admin\DownloadLinkController::class, 'store']);
        Route::post('/watch-links', [App\Http\Controllers\Admin\WatchLinkController::class, 'store']);
        Route::post('/seasons', [App\Http\Controllers\Admin\SeasonController::class, 'store']);
        Route::post('/episodes', [App\Http\Controllers\Admin\EpisodeController::class, 'store']);
    });
    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        // Analytics
        // Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard']);
        // Route::get('/analytics/trending', [AnalyticsController::class, 'trending']);
        // Route::get('/analytics/content-performance', [AnalyticsController::class, 'contentPerformance']);
        // Route::get('/analytics/user-activity', [AnalyticsController::class, 'userActivity']);
        // Route::get('/analytics/vip-metrics', [AnalyticsController::class, 'vipMetrics']);

        // // Movies management
        // Route::apiResource('movies', AdminMovieController::class);
        // Route::post('/movies/{movie}/persons', [AdminMovieController::class, 'addPerson']);
        // Route::delete('/movies/{movie}/persons/{personRole}', [AdminMovieController::class, 'removePerson']);

        // // Series management
        // Route::apiResource('series', AdminSeriesController::class);
        // Route::apiResource('series.seasons', AdminSeriesController::class);
        // Route::apiResource('seasons.episodes', AdminSeriesController::class);

        // // Persons management
        // Route::apiResource('persons', AdminPersonController::class);
        // Route::apiResource('person-roles', AdminPersonController::class);

        // // Streaming links management
        // Route::apiResource('watch-links', WatchLinkController::class);
        // Route::apiResource('download-links', DownloadLinkController::class);
        // Route::post('/links/health-check', [AdminStreamingController::class, 'bulkHealthCheck']);
        // Route::get('/links/statistics', [AdminStreamingController::class, 'getLinkStatistics']);

        // // VIP management
        // Route::apiResource('vip-keys', AdminVipController::class);
        // Route::post('/vip-keys/generate', [AdminVipController::class, 'generateKeys']);
        // Route::post('/vip-keys/bulk-deactivate', [AdminVipController::class, 'bulkDeactivate']);
        // Route::get('/vip-subscriptions', [AdminVipController::class, 'subscriptions']);
        // Route::get('/vip-statistics', [AdminVipController::class, 'statistics']);
        // Route::post('/vip-subscriptions/check-expired', [AdminVipController::class, 'checkExpiredSubscriptions']);

        // // Users management
        // Route::get('/users', [AdminUserController::class, 'index']);
        // Route::get('/users/{user}', [AdminUserController::class, 'show']);
        // Route::put('/users/{user}/ban', [AdminUserController::class, 'ban']);
        // Route::put('/users/{user}/unban', [AdminUserController::class, 'unban']);
        // Route::get('/users/{user}/watch-history', [AdminUserController::class, 'watchHistory']);
    });
});

// Fallback route for undefined API endpoints
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'API endpoint not found'
    ], 404);
});
