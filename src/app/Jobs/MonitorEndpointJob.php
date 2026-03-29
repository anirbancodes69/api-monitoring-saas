<?php

namespace App\Jobs;

use App\Models\Endpoint;
use App\Models\ApiLog;
use App\Services\AlertService;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class MonitorEndpointJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Endpoint $endpoint;

    public function __construct(Endpoint $endpoint)
    {
        $this->endpoint = $endpoint;
    }

    public function handle(): void
    {
        $startTime = microtime(true);

        // Always work with fresh model
        $endpoint = $this->endpoint->fresh();

        try {
            $response = Http::timeout(10)
                ->withHeaders($endpoint->headers ?? [])
                ->send($endpoint->method, $endpoint->url, [
                    'json' => $endpoint->body ?? [],
                ]);

            $responseTime = (microtime(true) - $startTime) * 1000;

            $isSuccess = $response->status() == $endpoint->expected_status;
            $currentStatus = $isSuccess ? 'UP' : 'DOWN';
            $previousStatus = $endpoint->last_status;


            // ✅ STATE CHANGE LOGIC (CORE)
            if ($previousStatus !== $currentStatus) {

                // Update FIRST (important)
                $endpoint->update([
                    'last_status' => $currentStatus
                ]);

                if ($currentStatus === 'DOWN') {
                    $this->sendAlert($endpoint, "🚨 API DOWN: {$endpoint->url}");
                }

                if ($currentStatus === 'UP') {
                    $this->sendRecoveryAlert($endpoint, "✅ API RECOVERED: {$endpoint->url}");
                }
            }

            // ✅ Always store logs
            ApiLog::create([
                'endpoint_id'   => $endpoint->id,
                'status'        => $isSuccess ? 'success' : 'fail',
                'status_code'   => $response->status(),
                'response_time' => $responseTime,
                'response_body' => substr($response->body(), 0, 1000),
                'checked_at'    => now(),
            ]);

        } catch (\Throwable $e) {

            $responseTime = (microtime(true) - $startTime) * 1000;

            // Log failure
            ApiLog::create([
                'endpoint_id'   => $endpoint->id,
                'status'        => 'fail',
                'response_time' => $responseTime,
                'error_message' => $e->getMessage(),
                'checked_at'    => now(),
            ]);

            $currentStatus = 'DOWN';
            $previousStatus = $endpoint->last_status;

            // ✅ Handle exception as DOWN state
            if ($previousStatus !== $currentStatus) {

                $endpoint->update([
                    'last_status' => 'DOWN'
                ]);

                $this->sendAlert($endpoint, "🚨 Exception: {$e->getMessage()}");
            }
        }
    }

    /**
     * Send failure alert (with optional cooldown)
     */
    protected function sendAlert(Endpoint $endpoint, string $message): void
    {
        app(AlertService::class)->sendFailureAlert(
            $endpoint->user,
            $endpoint,
            $message
        );

        // Optional: track last alert time
        $endpoint->update([
            'last_alert_sent_at' => now(),
        ]);
    }

    /**
     * Send recovery alert
     */
    protected function sendRecoveryAlert(Endpoint $endpoint, string $message): void
    {
        app(AlertService::class)->sendRecoveryAlert(
            $endpoint->user,
            $endpoint,
            $message
        );
    }
}