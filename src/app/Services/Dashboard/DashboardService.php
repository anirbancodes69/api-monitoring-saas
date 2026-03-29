<?php

namespace App\Services\Dashboard;

use App\Models\Endpoint;
use App\Models\ApiLog;

class DashboardService
{
    public function getUserDashboard($userId)
    {
        $endpoints = Endpoint::where('user_id', $userId)->get();

        return $endpoints->map(function ($endpoint) {

            $logs = ApiLog::where('endpoint_id', $endpoint->id)
                ->latest()
                ->take(50)
                ->get();

            $total = $logs->count();
            $success = $logs->where('status', 'success')->count();

            return [
                'endpoint_id' => $endpoint->id,
                'name' => $endpoint->name,
                'url' => $endpoint->url,
                'status' => $this->getCurrentStatus($logs),
                'uptime_percentage' => $total > 0 ? round(($success / $total) * 100, 2) : 0,
                'avg_response_time' => $logs->avg('response_time'),
                'last_checked' => optional($logs->first())->checked_at,
            ];
        });
    }

    private function getCurrentStatus($logs)
    {
        if ($logs->isEmpty()) return 'unknown';

        return $logs->first()->status === 'success' ? 'UP' : 'DOWN';
    }
}