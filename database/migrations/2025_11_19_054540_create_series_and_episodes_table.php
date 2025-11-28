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
        Schema::create('series', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('original_title')->nullable();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->smallInteger('release_year_start')->nullable();
            $table->smallInteger('release_year_end')->nullable();
            $table->enum('status', ['ongoing', 'upcoming', 'ended'])->default('ongoing');
            $table->string('language')->nullable();
            $table->string('country')->nullable();
            $table->string('imdb_id')->nullable()->index();
            $table->string('poster_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->string('trailer_url')->nullable();
            $table->enum('age_rating', ['G', 'PG', 'PG-13', 'R', '18+'])->nullable();
            $table->enum('visibility_status', ['public', 'private', 'coming_soon'])->default('public');
            $table->boolean('is_vip_only')->default(false);
            $table->decimal('rating_average', 3, 1)->default(0.0);
            $table->bigInteger('rating_count')->default(0);
            $table->timestamps();
            $table->index(['release_year_start', 'status']);
            $table->index(['is_vip_only', 'status']);
            $table->fullText(['title', 'description']);
        });

        Schema::create('seasons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('series_id');
            $table->integer('season_number')->default(1);
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->date('air_date')->nullable();
            $table->timestamps();

            $table->foreign('series_id')->references('id')->on('series')->onDelete('cascade');
            $table->unique(['series_id', 'season_number']);
            $table->index(['series_id', 'air_date']);
        });

        Schema::create('episodes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('season_id');
            $table->integer('episode_number')->default(1);
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('runtime')->nullable();
            $table->date('air_date')->nullable();
            $table->string('poster_url')->nullable();
            $table->string('trailer_url')->nullable();
            $table->string('imdb_id')->nullable()->index();
            $table->enum('visibility_status', ['public', 'private', 'coming_soon'])->default('public');
            $table->timestamps();

            $table->foreign('season_id')->references('id')->on('seasons')->onDelete('cascade');
            $table->unique(['season_id', 'episode_number']);
            $table->index(['season_id', 'episode_number']);
            $table->fullText(['title', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
        Schema::dropIfExists('seasons');
        Schema::dropIfExists('series');
    }
};
