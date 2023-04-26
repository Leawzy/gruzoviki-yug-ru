<?php

use App\Http\Controllers\Api\v1\ProductController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/product_list', [ProductController::class, 'showProducts']);
Route::get('/card/{id}', [ProductController::class, 'showCardProduct']);
Route::post('/register', [UserController::class, 'register']);

Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::get('/card/{id}', [ProductController::class, 'showCardProduct']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('/product_list', [ProductController::class, 'showProducts']);
});
