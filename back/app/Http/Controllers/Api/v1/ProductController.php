<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function showProducts(){

        return ProductResource::collection(Product::all());
    }

    public function getCardProduct($id){

        return new ProductResource(Product::findOrFail($id));
    }
}
