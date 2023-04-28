<?php

namespace App\Http\Resources\Orders;

use App\Http\Resources\Product\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
//        return new ProductResource($this->product)
        return [
            'id' => $this->product->id,
            'title' => $this->product->title,
        ];
    }
}
