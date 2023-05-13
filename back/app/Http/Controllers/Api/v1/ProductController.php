<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        return ProductResource::collection(Product::all());
    }
    public function showProducts($page = 1)
    {
        return ProductResource::collection(Product::paginate(9, ['*'], 'page', $page));
    }


    public function getPopularProduct()
    {
        return ProductResource::collection(Product::where('is_popular', true)->get());
    }

    public function getCardProduct($id)
    {
        return new ProductResource(Product::findOrFail($id));
    }

    public function productFilter(Request $request)
    {
        $query = Product::query();

//        $params = $request->only([
//            'category_id',
//            'brand_id',
//            'price_min',
//            'price_max',
//            'price_range',
//            'sort_by',
//            'sort_order',
//        ]);
        $filters = $request->query();

        $query->filter($filters);

        $results = $query->paginate(15);

        return ProductResource::collection($results);
    }
}
