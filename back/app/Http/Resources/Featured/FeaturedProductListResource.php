<?php

namespace App\Http\Resources\Featured;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeaturedProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product->id,
            'title' => $this->product->title,
            'price' => $this->product->price,
            'img' => $this->product->imageUrl,
        ];
    }
}
