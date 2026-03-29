<?php

namespace App\Services;

use App\Mail\EndpointFailedMail;
use App\Mail\EndpointRecoveredMail;
use App\Models\Endpoint;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class AlertService
{
    public function sendFailureAlert(User $user, Endpoint $endpoint, string $error): void
    {
        Mail::to($user->email)->send(
            new EndpointFailedMail($endpoint, $error)
        );
    }

    public function sendRecoveryAlert($user, $endpoint, $message): void
    {
        Mail::to($user->email)->send(
            new EndpointRecoveredMail($endpoint, $message)
        );
    }
}