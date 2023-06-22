<?php

namespace App\Http\Resources\Featured;

use App\Http\Resources\Product\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeaturedProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return ProductResource
     */
    public function toArray(Request $request): ProductResource
    {
        return new ProductResource($this->product);
    }
}
