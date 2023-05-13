<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Featured\FeaturedProductResource;
use App\Http\Resources\Orders\OrderResource;
use App\Http\Resources\Other\PostResource;
use App\Http\Resources\Other\SliderResource;
use App\Mail\FeedbackMail;
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
    public function showPost()
    {
        return PostResource::collection(Post::all());
    }

    public function getPostById($id)
    {
        return new PostResource(Post::findOrFail($id));
    }

    public function showSlider()
    {
        return SliderResource::collection(Slider::all());
    }

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

    public function createRecordRepair(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $data = $request->validate([
            'type' => $request['type'],
            'brand' => $request['brand'],
            'model' => $request['model'],
            'description' => $request['description'],
            'status' => $request['status'],
            'date' => $request['date'],
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

        if (FeaturedProductList::where('product_id', $product->id)->exists()) {
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

    public function getFeaturedProduct()
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $featured = FeaturedProduct::where('user_id', $user->id)->first();

        if($featured){
            return new FeaturedProductResource($featured);
        }
        else {
            return response()->json([
               'message' => "Избранных товаров нет"
            ]);
        }
    }

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

    public function sendFeedback(Request $request)
    {
        $feedback = Feedback::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'message' => $request->input('message'),
        ]);
        $feedback->save();

        $mailData = [
            'name' => $feedback->name,
            'email' => $feedback->email,
            'message' => $feedback->message,
        ];

        Mail::to('tofikdipsize1337228@yandex.ru')->send(new FeedbackMail($mailData));

        return response()->json(['message' => 'Feedback submitted successfully']);
    }
}
