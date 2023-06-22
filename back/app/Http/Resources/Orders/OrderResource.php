<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $products = [];

        foreach ($this->orderProduct as $orderProductResource)
        {
            $products[] = new OrderProductResource($orderProductResource);
        }

        return [
            'id' => $this->id,
            'date' => $this->created_at,
            'total' => $this->total,
            'delivery' => $this->delivery,
            'paymentMethod' => $this->payment_method,
            'status' => $this->status,
            'products' => $products,
        ];
    }
}
