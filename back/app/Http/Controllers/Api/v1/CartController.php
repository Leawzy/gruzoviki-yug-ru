<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
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

        $products = $request['products'];

        foreach ($products as $product) {
            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->order_id;
            $orderProduct->product_id = $product['id'];
            $orderProduct->save();

            $productModel = Product::find($product['id']);
            $productModel->quantity = -$product['quantity'];
            $productModel->save();
        }

        return response()->json([
            'message' => "Заказ успешно создан"
        ], 200);
    }
}
