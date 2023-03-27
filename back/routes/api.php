<?php

use App\Http\Controllers\API\V1\AdminController;
use App\Http\Controllers\API\V1\CartController;
use App\Http\Controllers\API\V1\PostController;
use App\Http\Controllers\API\V1\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\API\V1\ProductController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/user_list', [UserController::class, 'test_user_list']);
Route::get('/product_list', [ProductController::class, 'showProducts']);
Route::get('/card/{id}', [ProductController::class, 'CardProduct']);
Route::get('/posts', [PostController::class, 'showPosts']);
Route::get('/post/{id}', [PostController::class, 'showPostId']);
Route::post('/admin_login', [AdminController::class, 'admin_auth']);

Route::middleware("auth:api")->group(function(){
    Route::get('/profile', [ProfileController::class, 'show_profile']);
});

Route::middleware("api-admin")->group(function () {
    Route::get('/test', [UserController::class, 'test']);
});
