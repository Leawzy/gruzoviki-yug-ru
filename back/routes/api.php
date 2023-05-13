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
Route::get('/products/filter', [ProductController::class, 'productFilter']);

//User function
Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'authUser']);

// Other Function
Route::get('/slider', [OtherController::class, 'showSlider']);
Route::get('/posts', [OtherController::class, 'showPost']);
Route::get('/post/card/{id}', [OtherController::class, 'getPostById']);
Route::post('/repair/create', [OtherController::class, 'createRecordRepair']);
Route::post('/feedback', [OtherController::class, 'sendFeedback']);

//Auth User function
Route::middleware(['auth:api'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'getUserProfile']);
    Route::patch('/profile/change/password', [ProfileController::class, 'changeUserPassword']);
    Route::patch('/profile/change/info', [ProfileController::class, 'updateUserData']);
    Route::get('/orders', [OtherController::class, 'getOrders']);
    Route::post('/featured/create', [OtherController::class, 'createFeaturedProduct']);
    Route::get('/featured/get', [OtherController::class, 'getFeaturedProduct']);
    Route::delete('/featured/delete', [OtherController::class, 'deleteFeaturedProduct']);
});

//Admin function
Route::middleware(['auth:api', 'admin'])->group(function () {
    //User section
    Route::get('/admin/user/get', [AdminController::class, 'getAllUser']);
    Route::post('/admin/user/create', [AdminController::class, 'createUser']);
    Route::patch('/admin/user/change', [AdminController::class, 'changeUser']);
    Route::delete('/admin/user/delete', [AdminController::class, 'deleteUser']);

    //Brand section
    Route::get('/admin/brand/get', [AdminController::class, 'getAllBrand']);
    Route::post('/admin/brand/create', [AdminController::class, 'createBrand']);
    Route::post('/admin/brand/change', [AdminController::class, 'changeBrand']);
    Route::delete('/admin/brand/delete', [AdminController::class, 'deleteBrand']);

    //Slider section
    Route::get('/admin/slider/get', [AdminController::class, 'getAllSlider']);
    Route::post('/admin/slider/create', [AdminController::class, 'createSlider']);
    Route::post('/admin/slider/change', [AdminController::class, 'changeSlider']);
    Route::delete('/admin/slider/delete', [AdminController::class, 'deleteSlider']);

    //Category section
    Route::get('/admin/category/get', [AdminController::class, 'getAllCategory']);
    Route::post('/admin/category/create', [AdminController::class, 'createCategory']);
    Route::post('/admin/category/change', [AdminController::class, 'changeCategory']);
    Route::delete('/admin/category/delete', [AdminController::class, 'deleteCategory']);

    //Post section
    Route::get('/admin/post/get', [AdminController::class, 'getAllPost']);
    Route::post('/admin/post/create', [AdminController::class, 'createPost']);
    Route::post('/admin/post/change', [AdminController::class, 'changePost']);
    Route::delete('/admin/post/delete', [AdminController::class, 'deletePost']);

    //Product section
    Route::get('/admin/product/get', [AdminController::class, 'getAllProduct']);
    Route::post('/admin/product/create', [AdminController::class, 'createProduct']);
    Route::post('/admin/product/change', [AdminController::class, 'changeProduct']);
    Route::delete('/admin/product/delete', [AdminController::class, 'deleteProduct']);

    //Order section
    Route::get('/admin/order/get', [AdminController::class, 'getAllOrder']);
    Route::patch('/admin/order/change', [AdminController::class, 'changeOrder']);
    Route::delete('/admin/order/delete', [AdminController::class, 'deleteOrder']);

    //Repair section
    Route::get('/admin/repair/get', [AdminController::class, 'getAllRecordRepair']);
    Route::patch('/admin/repair/change', [AdminController::class, 'changeRecordRepair']);
    Route::delete('/admin/repair/delete', [AdminController::class, 'deleteRecordRepair']);
});
