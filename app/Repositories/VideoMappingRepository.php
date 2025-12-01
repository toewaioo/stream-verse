<?php

namespace App\Repositories;

use App\Models\VideoMapping;
use Illuminate\Support\Facades\DB;

class VideoMappingRepository
{
    public function create(array $data): int
    {
        $videoMapping = VideoMapping::create($data);
        return $videoMapping->id;
    }

    public function findByToken(string $token): ?array
    {
        $mapping = VideoMapping::where('token', $token)
            ->where('is_active', true)
            ->first();

        return $mapping ? $mapping->toArray() : null;
    }

    public function incrementAccessCount(int $mappingId): void
    {
        VideoMapping::where('id', $mappingId)->update([
            'access_count' => DB::raw('access_count + 1'),
            'last_accessed' => now()
        ]);
    }

    public function getPaginatedActive(int $limit, int $offset): array
    {
        return VideoMapping::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->skip($offset)
            ->take($limit)
            ->get()
            ->toArray();
    }

    public function getActiveCount(): int
    {
        return VideoMapping::where('is_active', true)->count();
    }

    public function getStatistics(): array
    {
        return VideoMapping::where('is_active', true)
            ->select(
                DB::raw('COUNT(*) as total_videos'),
                DB::raw('COALESCE(SUM(access_count), 0) as total_accesses'),
                DB::raw('COALESCE(AVG(access_count), 0) as avg_accesses'),
                DB::raw('COALESCE(MAX(access_count), 0) as max_accesses')
            )
            ->first()
            ->toArray();
    }
}
