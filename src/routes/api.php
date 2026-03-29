<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EndpointController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/endpoints', [EndpointController::class, 'index']);
    Route::post('/endpoints', [EndpointController::class, 'store']);
});
