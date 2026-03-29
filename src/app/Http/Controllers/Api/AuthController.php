<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, AuthService $authService)
    {
        return response()->json(
            $authService->register($request->validated())
        );
    }

    public function login(LoginRequest $request, AuthService $authService)
    {
        return response()->json(
            $authService->login($request->validated())
        );
    }
}