<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function createOrder(Request $request)
    {
        $data = $request->validate([
           'userId' => ['request', 'integer'],
            'date' => ['request'],
            'total' => ['request', 'integer'],
            'delivery' => ['request', 'string'],
            'paymentMethod' => ['request', 'string'],
            'status' => ['request', 'string'],
        ]);

        $order = Order::create([
           'user_id' => $data['userId'],
           'date' => $data['date'],
           'total' => $data['total'],
           'delivery' => $data['delivery'],
           'payment_method' => $data['paymentMethod'],
           'status' => $data['status'],
        ]);

        $order->save();

        return response()->json([
            'message' => "Заказ успешно создан"
        ], 200);
    }
}
