<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FeedbackMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $message;
    public $phoneNumber;
    public $questionCategory;

    public function __construct($mailData)
    {
        $this->name = $mailData['name'];
        $this->email = $mailData['email'];
        $this->message = $mailData['message'];
        $this->phoneNumber = $mailData['phoneNumber'];
        $this->questionCategory = $mailData['questionCategory'];
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Обратная связь Грузовики-ЮГ',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.feedback',
            with: [
                'name' => $this->name,
                'email' => $this->email,
                'phoneNumber' => $this->phoneNumber,
                'questionCategory' => $this->questionCategory,
                'msg' => $this->message,
            ]

        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
