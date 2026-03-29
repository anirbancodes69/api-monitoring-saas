<?php

namespace App\Console\Commands;

use App\Jobs\MonitorEndpointJob;
use App\Models\Endpoint;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('monitor:endpoints')]
#[Description('Monitor all active endpoints')]
class MonitorEndpointsCommand extends Command
{
    public function handle(): void
    {
        $currentMinute = now()->minute;

        $endpoints = Endpoint::where('is_active', true)->get();

        foreach ($endpoints as $endpoint) {
            if ($currentMinute % $endpoint->interval === 0) {
                MonitorEndpointJob::dispatch($endpoint);
                $this->info("Dispatching endpoint ID: {$endpoint->id}");
            }
        }

        $this->info('Filtered monitoring jobs dispatched.');
        
    }
}
