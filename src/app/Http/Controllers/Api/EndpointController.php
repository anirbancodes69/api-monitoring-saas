<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEndpointRequest;
use App\Services\EndpointService;
use Illuminate\Http\Request;

class EndpointController extends Controller
{
    public function index(Request $request, EndpointService $service)
    {
        return response()->json(
            $service->list($request->user()->id)
        );
    }

    public function store(StoreEndpointRequest $request, EndpointService $service)
    {
        return response()->json(
            $service->create($request->validated(), $request->user()->id)
        );
    }
}