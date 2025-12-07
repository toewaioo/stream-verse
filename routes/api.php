<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use App\Http\Controllers\Api\StreamingController;
use App\Http\Controllers\Api\WatchHistoryController;
use App\Http\Controllers\TelegramController;
use App\Http\Controllers\CleanUpController;
use App\Http\Controllers\Admin as Admin;

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

// --- PUBLIC ROUTES ---

// External services
Route::post('/telegram/webhook', [TelegramController::class, 'webhook']);
Route::get('/cleanup.php', [CleanUpController::class, 'cleanupSentMessages']); // Consider securing this

// Auth (password reset)
Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

// Public content browsing
Route::controller(MovieController::class)->prefix('movies')->group(function () {
    Route::get('/', 'index');
    Route::get('/trending', 'trending');
    Route::get('/search', 'search');
    Route::get('/genre/{genreSlug}', 'byGenre');
    Route::get('/{slug}', 'show');
    Route::get('/{slug}/related', 'related');
});

Route::controller(SeriesController::class)->prefix('series')->group(function () {
    Route::get('/', 'index');
    Route::get('/trending', 'trending');
    Route::get('/search', 'search');
    Route::get('/{slug}', 'show');
    Route::get('/{seriesSlug}/seasons/{seasonNumber}', 'season');
    Route::get('/{seriesSlug}/seasons/{seasonNumber}/episodes/{episodeNumber}', 'episode');
});


// --- PROTECTED ROUTES ---
Route::middleware('auth:sanctum')->group(function () {

    // Authentication
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/user', 'user');
        Route::post('/vip/redeem', 'redeemVip');
        Route::put('/profile', 'updateProfile');
        Route::put('/password/change', 'changePassword');
    });

    // Streaming
    Route::get('/movies/{slug}/stream', [StreamingController::class, 'getMovieStreamingLinks']);
    Route::get('/series/{seriesSlug}/seasons/{seasonNumber}/episodes/{episodeNumber}/stream', [StreamingController::class, 'getEpisodeStreamingLinks']);
    Route::get('/stream/proxy/{linkId}', [StreamingController::class, 'proxyStream'])->name('api.stream.proxy');
    Route::get('/download/proxy/{linkId}', [StreamingController::class, 'proxyDownload'])->name('api.download.proxy');
    Route::get('/download/{type}/{slug}', [StreamingController::class, 'getDownloadLinks']);
    Route::post('/links/{linkId}/report', [StreamingController::class, 'reportBrokenLink']);
    Route::get('/links/{linkId}/alternatives', [StreamingController::class, 'getAlternativeLinks']);

    // Watch History
    Route::controller(WatchHistoryController::class)->prefix('watch-history')->group(function () {
        Route::get('/', 'index');
        Route::get('/continue-watching', 'continueWatching');
        Route::post('/progress', 'updateProgress');
        Route::post('/clear', 'clearHistory');
        Route::delete('/{id}', 'removeFromHistory');
        Route::post('/{id}/complete', 'markAsCompleted');
        Route::get('/stats', 'getStats');
    });

    // --- ADMIN ROUTES ---
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::post('/movies', [Admin\MovieController::class, 'store']);
        Route::post('/series', [Admin\SeriesController::class, 'store']);
        Route::post('/genres', [Admin\GenreController::class, 'store']);
        Route::post('/persons', [Admin\PersonController::class, 'store']);
        Route::post('/download-links', [Admin\DownloadLinkController::class, 'store']);
        Route::post('/watch-links', [Admin\WatchLinkController::class, 'store']);
        Route::post('/seasons', [Admin\SeasonController::class, 'store']);
        Route::post('/episodes', [Admin\EpisodeController::class, 'store']);

        // Note: The commented-out admin routes for full resource management and analytics
        // can be added here as needed, following the same structure.
    });
});

// Fallback route for undefined API endpoints
Route::fallback(function () {
    return response()->json(['message' => 'API endpoint not found'], 404);
});