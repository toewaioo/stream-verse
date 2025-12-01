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
        Schema::create('access_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_mapping_id')->constrained()->onDelete('cascade');
            $table->bigInteger('user_id')->nullable();
            $table->string('user_first_name')->nullable();
            $table->string('user_username')->nullable();
            $table->timestamp('accessed_at');
            $table->boolean('success')->default(true);
            $table->text('error_message')->nullable();
            $table->integer('access_count')->default(1);
            $table->timestamps();

            $table->index(['user_id', 'accessed_at']);
            $table->index('video_mapping_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_logs');
    }
};
