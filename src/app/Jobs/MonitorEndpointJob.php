<?php

namespace App\Jobs;

use App\Models\Endpoint;
use App\Models\ApiLog;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class MonitorEndpointJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $endpoint;

    public function __construct(Endpoint $endpoint)
    {
        $this->endpoint = $endpoint;
    }

    public function handle(): void
    {
        $start = microtime(true);

        try {
            $response = Http::withHeaders($this->endpoint->headers ?? [])
                ->send($this->endpoint->method, $this->endpoint->url, [
                    'json' => $this->endpoint->body ?? []
                ]);

            $time = (microtime(true) - $start) * 1000;

            ApiLog::create([
                'endpoint_id' => $this->endpoint->id,
                'status' => $response->status() == $this->endpoint->expected_status ? 'success' : 'fail',
                'status_code' => $response->status(),
                'response_time' => $time,
                'response_body' => substr($response->body(), 0, 1000),
                'checked_at' => now(),
            ]);

        } catch (\Exception $e) {
            $time = (microtime(true) - $start) * 1000;

            ApiLog::create([
                'endpoint_id' => $this->endpoint->id,
                'status' => 'fail',
                'response_time' => $time,
                'error_message' => $e->getMessage(),
                'checked_at' => now(),
            ]);
        }
    }
}