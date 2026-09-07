<?php

use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserAuthController::class, 'register']);
Route::post('/login', [UserAuthController::class, 'login']);

Route::get("/test", function () {
    return response()->json(['message' => 'API is working']);
});

Route::get('/auth/google/redirect', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserAuthController::class, 'me']);

    // subfolders / files nested under a parent folder
    Route::post('/folders/{folder}/folders', [FolderController::class, 'store']);
    Route::post('/folders/{folder}/files', [FileController::class, 'store']);
    Route::post('/folders/{folder}/files/upload', [FileController::class, 'upload']);

    // direct resource access (uses implicit model binding)
    Route::get('/folders/{folder}', [FolderController::class, 'show']);
    Route::put('/folders/{folder}', [FolderController::class, 'update']);
    Route::delete('/folders/{folder}', [FolderController::class, 'destroy']);

    Route::get('/files/{file}', [FileController::class, 'show']);
    Route::put('/files/{file}', [FileController::class, 'update']);
    Route::delete('/files/{file}', [FileController::class, 'destroy']);
});
