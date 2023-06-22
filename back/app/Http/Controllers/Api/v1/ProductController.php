<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/product/list",
     *     summary="Show products",
     *     tags={"Product"},
     *     operationId="showProducts",
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         description="Search query",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="slug", type="string"),
     *                     @OA\Property(property="title", type="string"),
     *                     @OA\Property(property="shortDesc", type="string"),
     *                     @OA\Property(property="price", type="number"),
     *                     @OA\Property(property="quantity", type="integer"),
     *                     @OA\Property(property="img", type="string", nullable=true),
     *                     @OA\Property(property="brand", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                     ),
     *                     @OA\Property(property="art", type="string"),
     *                     @OA\Property(property="property", type="array", @OA\Items()),
     *                     @OA\Property(property="popular", type="boolean"),
     *                     @OA\Property(property="category", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                     ),
     *                 )
     *             ),
     *             @OA\Property(property="meta", type="object",
     *                 @OA\Property(property="last_page", type="integer"),
     *                 @OA\Property(property="per_page", type="integer"),
     *                 @OA\Property(property="total", type="integer"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Товаров не найдено"),
     *         ),
     *     ),
     * )
     */
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
        //Поиск товаров через ?q=
        $searchQuery = $request->query('q');

        if(!empty($searchQuery))
        {
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
                'total' => $products->total(),
            ];

            return response()->json([
                'data' => ProductResource::collection($products),
                'meta' => $meta
            ]);
        }

        return response()->json([
            'data' => ProductResource::collection($results),
            'meta' => [
                'last_page' => $results->lastPage(),
                'per_page' => $results->perPage(),
                'total' => $results->total(),
            ],
        ]);
    }

    /**
     * @OA\Get(
     *     path="/product/popular",
     *     summary="Get popular products",
     *     tags={"Product"},
     *     operationId="getPopularProduct",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="slug", type="string"),
     *                     @OA\Property(property="title", type="string"),
     *                     @OA\Property(property="shortDesc", type="string"),
     *                     @OA\Property(property="price", type="number"),
     *                     @OA\Property(property="quantity", type="integer"),
     *                     @OA\Property(property="img", type="string", nullable=true),
     *                     @OA\Property(property="brand", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                     ),
     *                     @OA\Property(property="art", type="string"),
     *                     @OA\Property(property="property", type="array", @OA\Items()),
     *                     @OA\Property(property="popular", type="boolean"),
     *                     @OA\Property(property="category", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                     ),
     *                 )
     *             ),
     *         ),
     *     ),
     * )
     */
    public function getPopularProduct()
    {
        return ProductResource::collection(Product::where('is_popular', true)->get());
    }

    /**
     * @OA\Get(
     *     path="/product/card/{id}",
     *     summary="Get a product by ID",
     *     tags={"Product"},
     *     operationId="getCardProduct",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Product ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer"),
     *             @OA\Property(property="slug", type="string"),
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="shortDesc", type="string"),
     *             @OA\Property(property="price", type="number"),
     *             @OA\Property(property="quantity", type="integer"),
     *             @OA\Property(property="img", type="string", nullable=true),
     *             @OA\Property(property="brand", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *             ),
     *             @OA\Property(property="art", type="string"),
     *             @OA\Property(property="property", type="array", @OA\Items()),
     *             @OA\Property(property="popular", type="boolean"),
     *             @OA\Property(property="category", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *     ),
     * )
     */
    public function getCardProduct($id)
    {
        return new ProductResource(Product::findOrFail($id));
    }

}
