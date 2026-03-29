<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EndpointRecoveredMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public $endpoint, public $contentMessage) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '✅ API Recovered',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.endpoint_recovered',
            with: [
                'endpoint' => $this->endpoint,
                'contentMessage' => $this->contentMessage,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
