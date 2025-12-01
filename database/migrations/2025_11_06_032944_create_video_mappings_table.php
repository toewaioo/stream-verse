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
        Schema::create('video_mappings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('token')->unique();
            $table->bigInteger('chat_id');
            $table->bigInteger('message_id');
            $table->string('file_id')->nullable();
            $table->enum('file_type', ['video', 'document', 'animation'])->default('video');
            $table->bigInteger('file_size')->nullable();
            $table->integer('duration')->nullable();
            $table->string('mime_type')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('access_count')->default(0);
            $table->timestamp('last_accessed')->nullable();
            $table->timestamps();

            $table->index(['token', 'is_active']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_mappings');
    }
};
