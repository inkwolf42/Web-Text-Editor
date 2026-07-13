<?php

use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Auth\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [UserAuthController::class, 'register']);
Route::post('/login', [UserAuthController::class, 'login']);

Route::get('/auth/google/redirect', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);


Route::middleware('auth:sanctum')->group(function (){
    Route::get('/me', [UserAuthController::class, 'me']);
});
