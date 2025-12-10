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
        Schema::table('vip_keys', function (Blueprint $table) {
            $table->integer('max_uses')->nullable()->after('duration_days');
            $table->integer('uses_count')->default(0)->after('max_uses');
            $table->timestamp('expires_at')->nullable()->after('uses_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vip_keys', function (Blueprint $table) {
            $table->dropColumn(['max_uses', 'uses_count', 'expires_at']);
        });
    }
};
