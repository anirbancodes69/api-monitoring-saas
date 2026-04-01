<?php

namespace App\Http\Controllers\Api;

use App\Models\ApiLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiLogController extends Controller
{
    /**
     * Get logs for a specific endpoint
     * 
     * @param int $id Endpoint ID
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id, Request $request)
    {
        $limit = $request->query('limit', 100);
        $offset = $request->query('offset', 0);

        // Fetch logs for the endpoint, ordered by most recent first
        $logs = ApiLog::where('endpoint_id', $id)
            ->orderBy('checked_at', 'desc')
            ->limit($limit)
            ->offset($offset)
            ->get();

        return response()->json([
            'data' => $logs,
            'count' => count($logs),
        ]);
    }
}
