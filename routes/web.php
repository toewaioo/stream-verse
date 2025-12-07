<?php

use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SeriesController as AdminSeriesController;
use App\Http\Controllers\Admin\GenreController as AdminGenreController;
use App\Http\Controllers\Admin\PersonController as AdminPersonController;

use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\MovieController;
use App\Http\Controllers\Web\SeriesController;
use App\Http\Controllers\Web\GenreController;
use App\Http\Controllers\Web\PersonController;
use App\Http\Controllers\Web\SitemapController;
use App\Http\Controllers\Web\PageController;
use App\Http\Controllers\Web\RatingController;
use App\Http\Controllers\Web\ProfileController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


// Public Routes
Route::get('/swagger.json', function () {
  

    $file = base_path('/storage/api-docs/swagger.json');
    if (!file_exists($file)) {
        return response()->json(['message' => 'Swagger JSON not found'], 404);
    }

    return response()->file($file, [
        'Content-Type' => 'application/json',
    ]);
});

// Public Routes
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/movies', [MovieController::class, 'index'])->name('movies.index');
Route::get('/movies/{slug}', [MovieController::class, 'show'])->name('movies.show');
Route::get('/series', [SeriesController::class, 'index'])->name('series.index');
Route::get('/series/{slug}', [SeriesController::class, 'show'])->name('series.show');

// Genre and Person Pages
Route::get('/genre/{slug}', [GenreController::class, 'show'])->name('genre.show');
Route::get('/person/{id}', [PersonController::class, 'show'])->name('person.show');

// Static Pages
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/terms', [PageController::class, 'terms'])->name('terms');

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/search', [HomeController::class, 'search'])->name('search');

// Telegram Authentication Page (for Mini App)
Route::get('/', function () {
    return Inertia::render('Auth/TgAuth', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->name('tgauth');



// Admin web routes (Inertia pages)
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        $stats = [
            'movies' => \App\Models\Movie::count(),
            'series' => \App\Models\Series::count(),
            'genres' => \App\Models\Genre::count(),
            'persons' => \App\Models\Person::count(),
        ];
        return Inertia::render('Admin/Dashboard', compact('stats'));
    })->name('admin.dashboard');
    Route::get('/movies', [AdminMovieController::class, 'index'])->name('admin.movies');

    Route::post('/movies', [AdminMovieController::class, 'store'])->name('admin.movies.store');
    Route::put('/movies/{movie}', [AdminMovieController::class, 'update'])->name('admin.movies.update');
    Route::delete('/movies/{movie}', [AdminMovieController::class, 'destroy'])->name('admin.movies.destroy');
    Route::get('/series', [AdminSeriesController::class, 'index'])->name('admin.series');
    Route::post('/series', [AdminSeriesController::class, 'store'])->name('admin.series.store');
    Route::put('/series/{series}', [AdminSeriesController::class, 'update'])->name('admin.series.update');
    Route::delete('/series/{series}', [AdminSeriesController::class, 'destroy'])->name('admin.series.destroy');
    Route::get('/movies/check-slug', [AdminMovieController::class, 'checkSlug'])->name('admin.movies.check-slug');
    Route::get('/series/check-slug', [AdminSeriesController::class, 'checkSlug'])->name('admin.series.check-slug');
    Route::get('/series/{series}', [AdminSeriesController::class, 'show'])->name('admin.series.show');

    // Genres
    Route::get('/genres', [AdminGenreController::class, 'index'])->name('admin.genres');
    Route::post('/genres', [AdminGenreController::class, 'store'])->name('admin.genres.store');
    Route::put('/genres/{genre}', [AdminGenreController::class, 'update'])->name('admin.genres.update');
    Route::delete('/genres/{genre}', [AdminGenreController::class, 'destroy'])->name('admin.genres.destroy');

    Route::get('/persons', [AdminPersonController::class, 'index'])->name('admin.persons');
    Route::post('/persons', [AdminPersonController::class, 'store'])->name('admin.persons.store');
    Route::put('/persons/{person}', [AdminPersonController::class, 'update'])->name('admin.persons.update');
    Route::delete('/persons/{person}', [AdminPersonController::class, 'destroy'])->name('admin.persons.destroy');


    Route::get('/download-links', function () {
        return Inertia::render('Admin/DownloadLinks', [
            'downloadLinks' => \App\Models\DownloadLink::all(),
        ]);
    })->name('admin.downloadLinks');

    Route::get('/watch-links', function () {
        return Inertia::render('Admin/WatchLinks', [
            'watchLinks' => \App\Models\WatchLink::all(),
        ]);
    })->name('admin.watchLinks');

    Route::get('/seasons', function () {
        return Inertia::render('Admin/Seasons', [
            'seasons' => \App\Models\Season::all(),
        ]);
    })->name('admin.seasons');

    Route::get('/episodes', function () {
        return Inertia::render('Admin/Episodes', [
            'episodes' => \App\Models\Episode::all(),
        ]);
    })->name('admin.episodes');

    // TMDB Integration
    Route::post('/tmdb/search', [\App\Http\Controllers\Admin\TmdbController::class, 'search'])->name('admin.tmdb.search');
    Route::post('/tmdb/details', [\App\Http\Controllers\Admin\TmdbController::class, 'details'])->name('admin.tmdb.details');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Ratings routes
    Route::get('/ratings', [App\Http\Controllers\Api\RatingController::class, 'index'])->name('api.ratings.index');
    Route::get('/ratings/{rating}', [App\Http\Controllers\Api\RatingController::class, 'show'])->name('api.ratings.show');
    Route::post('/ratings', [App\Http\Controllers\Api\RatingController::class, 'store'])->name('api.ratings.store');
    Route::put('/ratings/{rating}', [App\Http\Controllers\Api\RatingController::class, 'update'])->name('api.ratings.update');
    Route::delete('/ratings/{rating}', [App\Http\Controllers\Api\RatingController::class, 'destroy'])->name('api.ratings.destroy');
    Route::get('/ratings/user/{type}/{id}', [App\Http\Controllers\Api\RatingController::class, 'userRatingsForContent'])->name('api.ratings.userForContent');

    // Review routes
    Route::post('/movies/{movie}/reviews', [App\Http\Controllers\Api\ReviewController::class, 'storeMovieReview'])->name('api.movies.reviews.store');
    Route::post('/series/{series}/reviews', [App\Http\Controllers\Api\ReviewController::class, 'storeSeriesReview'])->name('api.series.reviews.store');
    Route::get('/movies/{movie}/reviews', [App\Http\Controllers\Api\ReviewController::class, 'getMovieReviews'])->name('api.movies.reviews.index');
    Route::get('/series/{series}/reviews', [App\Http\Controllers\Api\ReviewController::class, 'getSeriesReviews'])->name('api.series.reviews.index');
    Route::put('/reviews/{review}', [App\Http\Controllers\Api\ReviewController::class, 'update'])->name('api.reviews.update');
    Route::delete('/reviews/{review}', [App\Http\Controllers\Api\ReviewController::class, 'destroy'])->name('api.reviews.destroy');


    // Ratings
    // Route::get('/ratings', [RatingController::class, 'index'])->name('admin.ratings');
    // Route::get('/ratings/{rating}', [RatingController::class, 'show'])->name('admin.ratings.show');
    // Route::post('/ratings', [RatingController::class, 'store'])->name('admin.ratings.store');
    // Route::put('/ratings/{rating}', [RatingController::class, 'update'])->name('admin.ratings.update');

    // // Review routes
    // Route::post('/movies/{movie}/reviews', [App\Http\Controllers\Web\ReviewController::class, 'storeMovieReview'])->name('reviews.store.movie');
    // Route::post('/series/{series}/reviews', [App\Http\Controllers\Web\ReviewController::class, 'storeSeriesReview'])->name('reviews.store.series');
    // Route::put('/reviews/{review}', [App\Http\Controllers\Web\ReviewController::class, 'update'])->name('reviews.update');
    // Route::delete('/reviews/{review}', [App\Http\Controllers\Web\ReviewController::class, 'destroy'])->name('reviews.destroy');
});

// // Public Review Routes
// Route::get('/movies/{movie}/reviews', [App\Http\Controllers\Api\ReviewController::class, 'getMovieReviews'])->name('reviews.index.movie');
// Route::get('/series/{series}/reviews', [App\Http\Controllers\Api\ReviewController::class, 'getSeriesReviews'])->name('reviews.index.series');


require __DIR__ . '/auth.php';
