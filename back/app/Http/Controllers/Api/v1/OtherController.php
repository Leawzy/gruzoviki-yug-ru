<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Orders\OrderResource;
use App\Http\Resources\Other\PostResource;
use App\Http\Resources\Other\SliderResource;
use App\Models\Order;
use App\Models\Post;
use App\Models\Repair;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Http\Request;
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
        $order = Order::where(["userId" => $user->id])->get();

        if ($order) {
            return OrderResource::collection($order);
        }

        return 'null';
    }

    public function getRecordRepair(Request $request)
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
}
