<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'product_type' => $this->product_type,
            'short_desc' => $this->short_desc,
            'description' => $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'art' => $this->art,
            'brand' => $this->brand,
            'country' => $this->country,
            'img' => $this->imgUrl
        ];
    }
}
