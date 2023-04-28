<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Category\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'shortDesc' => $this->shortDesc,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'img' => $this->imageUrl,
            'brand' => $this->brand->title,
            'art' => $this->art,
            'property' => $this->properties,
            'popular' => $this->isPopular,
            'role' => $this->role,
            'category' => new CategoryResource($this->category),
        ];
    }
}
