<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Brand\BrandResource;
use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Featured\FeaturedProductResource;
use App\Http\Resources\Orders\OrderResource;
use App\Http\Resources\Other\PostResource;
use App\Http\Resources\Other\SliderResource;
use App\Mail\FeedbackMail;
use App\Models\Brand;
use App\Models\Category;
use App\Models\FeaturedProduct;
use App\Models\FeaturedProductList;
use App\Models\Feedback;
use App\Models\Order;
use App\Models\Post;
use App\Models\Product;
use App\Models\Repair;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class OtherController extends Controller
{
    /**
     * @OA\Get(
     *     path="/posts",
     *     summary="Get all posts",
     *     tags={"Other"},
     *     operationId="showPost",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="slug", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="shortDesc", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="img", type="string"),
     *                 @OA\Property(property="createdAt", type="string", format="date-time"),
     *             ),
     *         ),
     *     ),
     * )
     */
    public function showPost()
    {
        return PostResource::collection(Post::all());
    }

    /**
     * @OA\Get(
     *     path="/post/card/{id}",
     *     summary="Get a post by ID",
     *     tags={"Other"},
     *     operationId="getPostById",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the post",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64")
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
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="img", type="string"),
     *             @OA\Property(property="createdAt", type="string", format="date-time"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="string", example="Post not found"),
     *         ),
     *     ),
     * )
     */
    public function getPostById($id)
    {
        return new PostResource(Post::findOrFail($id));
    }
    /**
     * @OA\Get(
     *     path="/slider",
     *     summary="Get all sliders",
     *     tags={"Other"},
     *     operationId="showSlider",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="img", type="string"),
     *                 @OA\Property(property="name", type="string"),
     *             ),
     *         ),
     *     ),
     * )
     */
    public function showSlider()
    {
        return SliderResource::collection(Slider::all());
    }
    /**
     * @OA\Get(
     *     path="/orders",
     *     summary="Get user orders",
     *     tags={"Other"},
     *     operationId="getOrders",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="date", type="string", format="date-time"),
     *                 @OA\Property(property="total", type="number", format="float"),
     *                 @OA\Property(property="delivery", type="string"),
     *                 @OA\Property(property="paymentMethod", type="string"),
     *                 @OA\Property(property="status", type="string"),
     *                 @OA\Property(property="products", type="array", @OA\Items(
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="title", type="string"),
     *                     @OA\Property(property="slug", type="string"),
     *                 )),
     *             )),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     ),
     * )
     */
    public function getOrders(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        $order = Order::where(["user_id" => $user->id])->get();

        if ($order) {
            return OrderResource::collection($order);
        }

        return null;
    }

    /**
     * @OA\Post(
     *     path="/repair/create",
     *     summary="Create a new repair record",
     *     tags={"Other"},
     *     operationId="createRecordRepair",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="type", type="string", example="Двигатель"),
     *                 @OA\Property(property="brand", type="string", example="MAN"),
     *                 @OA\Property(property="model", type="string", example="THE MAN TGS"),
     *                 @OA\Property(property="description", type="string", example="Застучал мотор"),
     *                 @OA\Property(property="status", type="string", example="Обработка"),
     *                 @OA\Property(property="date", type="string", format="date", example="2023-06-19"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Вы успешно записались"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *     ),
     * )
     */
    public function createRecordRepair(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $data = $request->validate([
            'type' => ['required', 'string'],
            'brand' => ['required', 'string'],
            'model' => ['required', 'string'],
            'description' => ['required', 'string'],
            'status' => ['required', 'string'],
            'date' => ['required'],
        ]);

        $repair = Repair::create([
            'user_id' => $user->id,
            'type' => $data['type'],
            'brand' => $data['brand'],
            'model' => $data['model'],
            'description' => $data['description'],
            'status' => $data['status'],
            'date' => $data['date'],
        ]);

        $repair->save();

        return response()->json([
            'message' => "Вы успешно записались"
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/featured/create",
     *     summary="Create a new featured product",
     *     tags={"Other"},
     *     operationId="createFeaturedProduct",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="productId", type="integer"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Товар name успешно добавлен в избранное"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Товар name уже в избранном"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     * )
     */
    public function createFeaturedProduct(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $data = $request->validate([
            'productId' => ['required', 'integer'],
        ]);

        $featured = FeaturedProduct::firstOrCreate([
            'user_id' => $user->id,
        ]);

        $product = Product::findOrFail($data['productId']);

        if (FeaturedProductList::where('product_id', $product->id)
            ->where('featured_products_id', $featured->id)
            ->exists()) {
            return response()->json([
                'message' => "Товар '{$product->title}' уже в избранном",
            ]);
        }

        FeaturedProductList::create([
            'product_id' => $product->id,
            'featured_products_id' => $featured->id,
        ]);

        return response()->json([
            'message' => "Товар '{$product->title}' успешно добавлен в избранное",
        ]);
    }

    /**
     * @OA\Get(
     *     path="/featured/get",
     *     summary="Get featured product",
     *     tags={"Other"},
     *     operationId="getFeaturedProduct",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="products", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="slug", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="shortDesc", type="string"),
     *                 @OA\Property(property="price", type="number"),
     *                 @OA\Property(property="quantity", type="integer"),
     *                 @OA\Property(property="img", type="string", nullable=true),
     *                 @OA\Property(property="brand", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="name", type="string"),
     *                 ),
     *                 @OA\Property(property="art", type="string"),
     *                 @OA\Property(property="property", type="object"),
     *                 @OA\Property(property="popular", type="boolean"),
     *                 @OA\Property(property="category", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="name", type="string"),
     *                 ),
     *             )),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No featured products available"),
     *         ),
     *     ),
     * )
     */
    public function getFeaturedProduct()
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $featured = FeaturedProduct::where('user_id', $user->id)->first();

        if ($featured) {
            return new FeaturedProductResource($featured);
        } else {
            return response()->json([
                'message' => "Избранных товаров нет"
            ]);
        }
    }

    /**
     * @OA\Delete(
     *     path="/featured/delete",
     *     summary="Delete a featured product",
     *     tags={"Other"},
     *     operationId="deleteFeaturedProduct",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="productId", type="integer", example=1),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Товар name успешно удален из избранного"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Товар не найден"),
     *         ),
     *     ),
     * )
     */
    public function deleteFeaturedProduct(Request $request)
    {
        $data = $request->validate([
            'productId' => ["required", "integer"]
        ]);

        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $product = Product::findOrFail($data['productId']);

        $featured = FeaturedProduct::where('user_id', $user->id)->firstOrFail();

        $featuredProduct = FeaturedProductList::where('featured_products_id', $featured->id)
            ->where('product_id', $product->id)
            ->delete();


        return response()->json([
            'message' => "Товар '{$product->title}' успешно удален из избранного",
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/feedback",
     *     summary="Send feedback",
     *     tags={"Other"},
     *     operationId="sendFeedback",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="name", type="string", example="John"),
     *                 @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
     *                 @OA\Property(property="phoneNumber", type="string", example="1234567890"),
     *                 @OA\Property(property="message", type="string", example="Feedback message"),
     *                 @OA\Property(property="questionCategory", type="string", example="Category"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Feedback submitted successfully"),
     *         ),
     *     ),
     * )
     */
    public function sendFeedback(Request $request)
    {
        $feedback = Feedback::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phoneNumber'),
            'message' => $request->input('message'),
            $request->input('questionCategory') === null ?: 'question_category' => $request->input('questionCategory')
        ]);
        $feedback->save();

        $mailData = [
            'name' => $feedback->name,
            'email' => $feedback->email,
            'message' => $feedback->message,
            'phoneNumber' => $feedback->phone_number,
            'questionCategory' => $feedback->question_category === null ? 'Отсутствует' : $feedback->question_category
        ];

        Mail::to('tofikdipsize1337228@yandex.ru')->send(new FeedbackMail($mailData));

        return response()->json(['message' => 'Feedback submitted successfully']);
    }

    /**
     * @OA\Get(
     *     path="/special",
     *     summary="Get special property",
     *     tags={"Other"},
     *     operationId="getSpecialProperty",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="brand", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="slug", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="img", type="string", nullable=true),
     *             )),
     *             @OA\Property(property="category", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="slug", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="property", type="array", @OA\Items(
     *                     @OA\Property(property="name", type="string"),
     *                     @OA\Property(property="value", type="string"),
     *                 )),
     *             )),
     *             @OA\Property(property="maxPrice", type="integer", example=100),
     *             @OA\Property(property="minPrice", type="integer", example=10),
     *         ),
     *     ),
     * )
     */
    public function getSpecialProperty()
    {
        $brand = BrandResource::collection(Brand::all());
        $category = CategoryResource::collection(Category::all());

        return response()->json([
            'brand' => $brand,
            'category' => $category,
            'maxPrice' => Product::max('price'),
            'minPrice' => Product::min('price'),
        ], 200);
    }
}
