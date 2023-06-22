<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Mail\OrderMail;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{
    /**
     * @OA\Post(
     *     path="/order/create",
     *     summary="Create an order",
     *     tags={"Cart"},
     *     operationId="createOrder",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="total", type="integer", example=100),
     *                 @OA\Property(property="delivery", type="string", example="Express"),
     *                 @OA\Property(property="paymentMethod", type="string", example="Credit Card"),
     *                 @OA\Property(property="status", type="string", example="Pending"),
     *                 @OA\Property(property="products", type="array", @OA\Items(
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="quantity", type="integer"),
     *                 )),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Заказ успешно создан"),
     *         ),
     *     ),
     * )
     */
    public function createOrder(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $data = $request->validate([
            'total' => ['required', 'integer'],
            'delivery' => ['required', 'string'],
            'paymentMethod' => ['required', 'string'],
            'status' => ['required', 'string'],
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'total' => $data['total'],
            'delivery' => $data['delivery'],
            'payment_method' => $data['paymentMethod'],
            'status' => $data['status'],
        ]);

        $order->save();

        $products = $request['products'];

        foreach ($products as $product) {
            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->id;
            $orderProduct->product_id = $product['id'];
            $orderProduct->quantity = $product['quantity'];
            $orderProduct->save();

            $productModel = Product::find($product['id']);
            $productModel->quantity = $productModel->quantity - $product['quantity'];
            $productModel->save();
        }

        Mail::to($user->email)->send(new OrderMail($order->id, $order->total, $products, $order->status));

        return response()->json([
            'message' => "Заказ успешно создан"
        ], 200);
    }
}
