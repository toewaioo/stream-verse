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

        // Add soft deletes to movies table
        Schema::table('movies', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Add soft deletes to series table
        Schema::table('series', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Add soft deletes to persons table
        Schema::table('persons', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Add soft deletes to users table (if not already there)
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('series', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('persons', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
