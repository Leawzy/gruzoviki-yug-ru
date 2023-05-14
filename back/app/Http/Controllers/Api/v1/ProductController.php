<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function showProducts(Request $request)
    {
        $query = Product::query();

        $filters = $request->query();

        $query->filter($filters);

        $results = $query->paginate(9);

        if ($results->isEmpty()) {
            return response()->json([
                'message' => 'Товаров не найдено',
            ], 404);
        }

        return response()->json([
            'data' => ProductResource::collection($results),
            'meta' => [
                'last_page' => $results->lastPage(),
                'per_page' => $results->perPage(),
            ],
        ]);
    }

    public function getPopularProduct()
    {
        return ProductResource::collection(Product::where('is_popular', true)->get());
    }

    public function getCardProduct($id)
    {
        return new ProductResource(Product::findOrFail($id));
    }

    public function searchProduct(Request $request)
    {
        $searchQuery = $request->query('q');
        $products = Product::where(function ($query) use ($searchQuery) {
            $query->where('title', 'like', '%' . $searchQuery . '%')
                ->orWhereHas('category', function ($query) use ($searchQuery) {
                    $query->where('title', 'like', '%' . $searchQuery . '%');
                })
                ->orWhereHas('brand', function ($query) use ($searchQuery) {
                    $query->where('title', 'like', '%' . $searchQuery . '%');
                })
                ->orWhere('art', 'like', '%' . $searchQuery . '%');
        })->paginate(9);

        $meta = [
            'last_page' => $products->lastPage(),
            'per_page' => $products->perPage(),
        ];

        return response()->json([
            'data' => ProductResource::collection($products),
            'meta' => $meta
        ]);
    }

}
