<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\Product\ProductResource;

class ProductController extends Controller
{
    public function showProducts(){

        return ProductResource::collection(Product::all());
    }

    public function CardProduct($id){

            return new ProductResource(Product::findOrFail($id));
    }
}
