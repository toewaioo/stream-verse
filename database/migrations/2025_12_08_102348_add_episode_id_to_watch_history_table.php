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
        Schema::table('watch_history', function (Blueprint $table) {
            // Add new column
            $table->unsignedBigInteger('series_id')->nullable()->after('episode_id');

            // Add foreign key
            $table->foreign('series_id')
                ->references('id')
                ->on('series')
                ->onDelete('cascade');

            // Drop old unique constraint
            $table->dropUnique('watch_history_unique');

            // Create new unique rule including episode_id
            $table->unique(['user_id', 'movie_id', 'series_id', 'episode_id'], 'watch_history_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('watch_history', function (Blueprint $table) {
            // Drop new unique rule
            $table->dropUnique('watch_history_unique');

            // Remove fk + column
            $table->dropForeign(['series_id']);
            $table->dropColumn('series_id');

            // Restore previous unique
            $table->unique(['user_id', 'movie_id', 'episode_id'], 'watch_history_unique');
        });
    }
};
