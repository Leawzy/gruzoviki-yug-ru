<?php

use App\Http\Controllers\Api\v1\AdminController;
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
Route::get('/product/list/{page?}', [ProductController::class, 'showProducts']);
Route::get('/product/card/{id}', [ProductController::class, 'getCardProduct']);
Route::get('/product/popular', [ProductController::class, 'getPopularProduct']);

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
    Route::patch('/profile/change/password', [ProfileController::class, 'changeUserPassword']);
    Route::patch('/profile/change/info', [ProfileController::class, 'updateUserData']);
    Route::get('/orders', [OtherController::class, 'getOrders']);
});

//Admin function
Route::middleware(['auth:api', 'admin'])->group(function () {
    //User section
    Route::get('/admin/user/get/{page?}', [AdminController::class, 'getAllUser']);
    Route::post('/admin/user/create', [AdminController::class, 'createUser']);
    Route::patch('/admin/user/change', [AdminController::class, 'changeUser']);

    //Brand section
    Route::get('/admin/brand/get/{page?}', [AdminController::class, 'getAllBrand']);
    Route::post('/admin/brand/create', [AdminController::class, 'createBrand']);
    Route::post('/admin/brand/change', [AdminController::class, 'changeBrand']);

    //Slider section
    Route::get('/admin/slider/get/{page?}', [AdminController::class, 'getAllSlider']);
    Route::post('/admin/slider/create', [AdminController::class, 'createSlider']);
    Route::post('/admin/slider/change', [AdminController::class, 'changeSlider']);

    //Category section
    Route::get('/admin/category/get/{page?}', [AdminController::class, 'getAllCategory']);
    Route::post('/admin/category/create', [AdminController::class, 'createCategory']);
    Route::post('/admin/category/change', [AdminController::class, 'changeCategory']);
});
