<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApiLog extends Model
{
    protected $fillable = [
        'endpoint_id',
        'status',
        'status_code',
        'response_time',
        'response_body',
        'error_message',
        'checked_at'
    ];
}
