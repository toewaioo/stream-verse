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
        Schema::create('movies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('original_title')->nullable();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->date('release_date')->nullable();
            $table->integer('runtime')->nullable(); // minutes
            $table->string('language')->nullable();
            $table->string('country')->nullable();
            $table->string('imdb_id')->nullable()->index();
            $table->bigInteger('budget')->nullable();
            $table->bigInteger('revenue')->nullable();
            $table->string('trailer_url')->nullable();
            $table->string('poster_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->decimal('rating_average', 3, 1)->default(0.0);
            $table->bigInteger('rating_count')->default(0);
            $table->enum('age_rating', ['G', 'PG', 'PG-13', 'R', '18+'])->nullable();
            $table->boolean('is_vip_only')->default(false);
            $table->enum('visibility_status', ['public', 'private', 'coming_soon'])->default('public');
            $table->enum('status', ['released', 'upcoming', 'canceled'])->default('released');
            $table->timestamps();

            $table->index(['release_date', 'visibility_status']);
            $table->index(['rating_average', 'rating_count']);
            $table->index(['is_vip_only', 'visibility_status']);
            $table->fullText(['title', 'description']); // PGSQL 12+ support via Laravel scout if desired
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
