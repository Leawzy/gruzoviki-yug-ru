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
Route::get('/products', [ProductController::class, 'getAllProducts']);

//User function
Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'authUser']);

// Other Function
Route::get('/slider', [OtherController::class, 'showSlider']);
Route::get('/posts', [OtherController::class, 'showPost']);
Route::get('/post/card/{id}', [OtherController::class, 'getPostById']);
Route::post('/repair', [OtherController::class, 'getRecordRepair']);

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
    Route::get('/admin/user/get', [AdminController::class, 'getAllUser']);
    Route::post('/admin/user/create', [AdminController::class, 'createUser']);
    Route::patch('/admin/user/change', [AdminController::class, 'changeUser']);

    //Brand section
    Route::get('/admin/brand/get', [AdminController::class, 'getAllBrand']);
    Route::post('/admin/brand/create', [AdminController::class, 'createBrand']);
    Route::post('/admin/brand/change', [AdminController::class, 'changeBrand']);

    //Slider section
    Route::get('/admin/slider/get', [AdminController::class, 'getAllSlider']);
    Route::post('/admin/slider/create', [AdminController::class, 'createSlider']);
    Route::post('/admin/slider/change', [AdminController::class, 'changeSlider']);

    //Category section
    Route::get('/admin/category/get', [AdminController::class, 'getAllCategory']);
    Route::post('/admin/category/create', [AdminController::class, 'createCategory']);
    Route::post('/admin/category/change', [AdminController::class, 'changeCategory']);

    //Post section
    Route::get('/admin/post/get', [AdminController::class, 'getAllPost']);
    Route::post('/admin/post/create', [AdminController::class, 'createPost']);
    Route::post('/admin/post/change', [AdminController::class, 'changePost']);

    //Product section
    Route::get('/admin/product/get', [AdminController::class, 'getAllProduct']);
    Route::post('/admin/product/create', [AdminController::class, 'createProduct']);
    Route::post('/admin/product/change', [AdminController::class, 'changeProduct']);

    //Order section
    Route::get('/admin/order/get', [AdminController::class, 'getAllOrder']);
    Route::patch('/admin/order/change', [AdminController::class, 'changeOrder']);

    //Repair section
    Route::get('/admin/repair/get', [AdminController::class, 'getAllRecordRepair']);
    Route::patch('/admin/repair/change', [AdminController::class, 'changeRecordRepair']);
});
