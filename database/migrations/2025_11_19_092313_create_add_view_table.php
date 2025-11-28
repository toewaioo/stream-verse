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
        Schema::table('movies', function (Blueprint $table) {
            $table->unsignedBigInteger('view_count')->default(0)->after('status');
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->unsignedBigInteger('view_count')->default(0)->after('imdb_id');
        });

        Schema::table('series', function (Blueprint $table) {
            $table->unsignedBigInteger('view_count')->default(0)->after('is_vip_only');
        });
    }

    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('view_count');
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->dropColumn('view_count');
        });

        Schema::table('series', function (Blueprint $table) {
            $table->dropColumn('view_count');
        });
    }
};
