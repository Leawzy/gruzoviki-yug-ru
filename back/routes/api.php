<?php

use App\Http\Controllers\API\V1\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\API\V1\ProductController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/test', [UserController::class, 'test']);
Route::get('/product_list', [ProductController::class, 'showProducts']);
Route::get('/card/{id}', [ProductController::class, 'CardProduct']);

Route::middleware("auth:api")->group(function(){
    Route::get('/profile', [ProfileController::class, 'show_profile']);
});
