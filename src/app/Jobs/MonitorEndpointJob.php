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
use Illuminate\Support\Carbon;

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

        try {
            $response = Http::timeout(10)
                ->withHeaders($this->endpoint->headers ?? [])
                ->send($this->endpoint->method, $this->endpoint->url, [
                    'json' => $this->endpoint->body ?? [],
                ]);

            $responseTime = (microtime(true) - $startTime) * 1000;

            $isSuccess = $response->status() == $this->endpoint->expected_status;

            // Store log
            ApiLog::create([
                'endpoint_id'   => $this->endpoint->id,
                'status'        => $isSuccess ? 'success' : 'fail',
                'status_code'   => $response->status(),
                'response_time' => $responseTime,
                'response_body' => substr($response->body(), 0, 1000),
                'checked_at'    => now(),
            ]);

            // Trigger alert if failed
            if (!$isSuccess) {

                $this->sendAlert("Unexpected status: " . $response->status());
            }

        } catch (\Throwable $e) {
            $responseTime = (microtime(true) - $startTime) * 1000;

            // Store failure log
            ApiLog::create([
                'endpoint_id'   => $this->endpoint->id,
                'status'        => 'fail',
                'response_time' => $responseTime,
                'error_message' => $e->getMessage(),
                'checked_at'    => now(),
            ]);

            // Send alert
            $this->sendAlert($e->getMessage());
        }
    }

    /**
     * Send alert with basic cooldown logic
     */
    protected function sendAlert(string $message): void
    {
        $endpoint = $this->endpoint->fresh();

        // ⛔ Prevent spam (5 min cooldown)
        if ($endpoint->last_alert_sent_at) {
            $lastAlert = Carbon::parse($endpoint->last_alert_sent_at);

            if ($lastAlert->diffInMinutes(now()) < 45) {
                return;
            }
        }

        app(AlertService::class)->sendFailureAlert(
            $endpoint->user,
            $endpoint,
            $message
        );

        // Update last alert time
        $endpoint->update([
            'last_alert_sent_at' => now(),
        ]);

    }
}