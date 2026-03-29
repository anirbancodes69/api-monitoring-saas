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
        'is_active'
    ];

    protected $casts = [
        'headers' => 'array',
        'body' => 'array',
        'is_active' => 'boolean'
    ];
}
