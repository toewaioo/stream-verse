<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // create_genres_categories_and_pivots.php
        Schema::create('genres', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });
        Schema::create('genre_movie', function (Blueprint $table) {
            $table->unsignedBigInteger('genre_id');
            $table->unsignedBigInteger('movie_id');
            $table->primary(['genre_id', 'movie_id']);
            $table->foreign('genre_id')->references('id')->on('genres')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });
        Schema::create('genre_series', function (Blueprint $table) {
            $table->unsignedBigInteger('genre_id');
            $table->unsignedBigInteger('series_id');
            $table->primary(['genre_id', 'series_id']);
            $table->foreign('genre_id')->references('id')->on('genres')->onDelete('cascade');
            $table->foreign('series_id')->references('id')->on('series')->onDelete('cascade');
        });
        Schema::create('category_movie', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('movie_id');
            $table->primary(['category_id', 'movie_id']);
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });

        // links
        Schema::create('watch_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('movie_id')->nullable();
            $table->unsignedBigInteger('episode_id')->nullable();
            $table->string('quality')->nullable();
            $table->string('server_name')->nullable();
            $table->string('source_type')->nullable();
            $table->text('embed_code')->nullable();
            $table->text('url');
            $table->string('file_size')->nullable();
            $table->string('file_format')->nullable();
            $table->json('headers')->nullable();
            $table->boolean('requires_proxy')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_vip_only')->default(false);
            $table->integer('priority')->default(1);
            $table->integer('success_rate')->default(100);
            $table->timestamp('last_checked_at')->nullable();
            $table->timestamps();
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('episode_id')->references('id')->on('episodes')->onDelete('cascade');
            $table->index(['movie_id', 'episode_id', 'quality']);
        });

        Schema::create('download_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('movie_id')->nullable();
            $table->unsignedBigInteger('episode_id')->nullable();
            $table->string('quality')->nullable();
            $table->string('server_name')->nullable();
            $table->string('source_type')->nullable();
            $table->text('url');
            $table->string('file_size')->nullable();
            $table->string('file_format')->nullable();
            $table->json('headers')->nullable();
            $table->boolean('requires_proxy')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_vip_only')->default(false);
            $table->integer('priority')->default(1);
            $table->integer('success_rate')->default(100);
            $table->timestamp('last_checked_at')->nullable();
            $table->timestamps();
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('episode_id')->references('id')->on('episodes')->onDelete('cascade');
        });

        Schema::create('ratings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('user_id');
            $table->unsignedBigInteger('movie_id')->nullable();
            $table->unsignedBigInteger('episode_id')->nullable();
            $table->tinyInteger('rating')->unsigned(); // 1-10
            $table->text('review_text')->nullable();
            $table->boolean('spoiler_flag')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('episode_id')->references('id')->on('episodes')->onDelete('cascade');
            $table->index(['user_id', 'movie_id', 'episode_id']);
        });

        Schema::create('watch_history', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('user_id');
            $table->unsignedBigInteger('movie_id')->nullable();
            $table->unsignedBigInteger('series_id')->nullable();
            $table->bigInteger('last_position_seconds')->default(0);
            $table->boolean('completed')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('series_id')->references('id')->on('series')->onDelete('cascade');
            $table->unique(['user_id', 'movie_id', 'series_id'], 'watch_history_unique');
        });

        Schema::create('vip_keys', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('key')->unique();
            $table->integer('duration_days')->unsigned();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('vip_subscriptions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('user_id');
            $table->unsignedBigInteger('key_id');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('key_id')->references('id')->on('vip_keys')->onDelete('cascade');
            $table->index(['user_id', 'start_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genres_and_pivot');
    }
};
