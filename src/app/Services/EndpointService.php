<?php

namespace App\Services;

use App\Models\Endpoint;

class EndpointService
{
    public function create(array $data, $userId)
    {
        return Endpoint::create([
            ...$data,
            'user_id' => $userId,
        ]);
    }

    public function list($userId)
    {
        return Endpoint::where('user_id', $userId)->latest()->get();
    }
}