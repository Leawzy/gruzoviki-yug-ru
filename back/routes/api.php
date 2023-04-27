<?php

use App\Http\Controllers\Api\v1\OtherController;
use App\Http\Controllers\Api\v1\ProductController;
use App\Http\Controllers\Api\v1\ProfileController;
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
//Product function
Route::get('/product_list', [ProductController::class, 'showProducts']);
Route::get('/card/{id}', [ProductController::class, 'getCardProduct']);

//User function
Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'authUser']);

// Other Function
Route::get('/slider', [OtherController::class, 'showSlider']);
Route::get('/posts', [OtherController::class, 'showPost']);
Route::get('/post/{id}', [OtherController::class, 'getPostById']);

//Auth User function
Route::middleware(['auth:api'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'getUserProfile']);
});

//Admin function
Route::middleware(['auth:api', 'admin'])->group(function () {

});
