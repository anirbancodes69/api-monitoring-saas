<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;

class EndpointFailedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $endpoint;
    public $error;

    public function __construct($endpoint, $error)
    {
        $this->endpoint = $endpoint;
        $this->error = $error;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🚨 API Failure Alert',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.endpoint_failed',
            with: [
                'endpoint' => $this->endpoint,
                'error' => $this->error,
            ],
        );
    }
}