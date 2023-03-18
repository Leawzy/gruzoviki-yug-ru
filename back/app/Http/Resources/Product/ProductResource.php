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
            'short_desk' => $this->short_desk,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'img' => $this->imgUrl,
            'brand' => $this->brand->title,
            'art' => $this->art,
            'property' => $this->oils,
        ];
    }
}
