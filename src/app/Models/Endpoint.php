<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Endpoint extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'url',
        'method',
        'headers',
        'body',
        'expected_status',
        'interval',
        'is_active',
        'last_alert_sent_at'
    ];

    protected $casts = [
        'headers' => 'array',
        'body' => 'array',
        'is_active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
