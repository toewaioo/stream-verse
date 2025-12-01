<?php

namespace App\Repositories;

use App\Models\AccessLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
class AccessLogRepository
{
    public function logAccess(array $data): void
    {
        try {
            // Find existing access log for this user and video
            $accessLog = AccessLog::where('video_mapping_id', $data['video_mapping_id'])
                ->where('user_id', $data['user_id'])
                ->first();

            if ($accessLog) {
                // Update existing record
                $accessLog->update([
                    'user_first_name' => $data['user_first_name'],
                    'user_username' => $data['user_username'],
                    'accessed_at' => now(),
                    'success' => $data['success'],
                    'error_message' => $data['error_message'],
                    'access_count' => $accessLog->access_count + 1
                ]);
            } else {
                // Create new record
                AccessLog::create([
                    'video_mapping_id' => $data['video_mapping_id'],
                    'user_id' => $data['user_id'],
                    'user_first_name' => $data['user_first_name'],
                    'user_username' => $data['user_username'],
                    'accessed_at' => now(),
                    'success' => $data['success'],
                    'error_message' => $data['error_message'],
                    'access_count' => 1
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error logging access: ' . $e->getMessage(), $data);
        }
    }

    public function getUserStatistics(): array
    {
        $stats = AccessLog::where('success', true)
            ->whereNotNull('user_id')
            ->select(
                DB::raw('COUNT(DISTINCT user_id) as total_users'),
                DB::raw('COALESCE(SUM(access_count), 0) as total_accesses'),
                DB::raw('COALESCE(AVG(access_count), 0) as avg_accesses'),
                DB::raw('COALESCE(MAX(access_count), 0) as max_accesses')
            )
            ->first();

        return $stats ? $stats->toArray() : [
            'total_users' => 0,
            'total_accesses' => 0,
            'avg_accesses' => 0,
            'max_accesses' => 0
        ];
    }

    public function getBroadcastUsers(): array
    {
        return AccessLog::whereNotNull('user_id')
            ->select('user_id', 'user_first_name')
            ->distinct()
            ->get()
            ->toArray();
    }
}