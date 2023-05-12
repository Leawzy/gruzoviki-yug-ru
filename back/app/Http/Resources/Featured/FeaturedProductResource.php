<?php

namespace App\Http\Resources\Featured;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeaturedProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $products = [];

        foreach ($this->featuredProduct as $orderProductResource)
        {
            $products[] = new FeaturedProductListResource($orderProductResource);
        }
        return [
            'products' => $products,
        ];
    }
}
