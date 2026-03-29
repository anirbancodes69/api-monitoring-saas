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

    public function findUserEndpoint($endpointId, $userId)
    {
        return Endpoint::where('id', $endpointId)
            ->where('user_id', $userId)
            ->firstOrFail();
    }

    public function update($endpointId, array $data, $userId)
    {
        $endpoint = $this->findUserEndpoint($endpointId, $userId);

        $endpoint->update($data);

        return $endpoint;
    }

    public function delete($endpointId, $userId)
    {
        $endpoint = $this->findUserEndpoint($endpointId, $userId);

        $endpoint->delete();

        return true;
    }
}