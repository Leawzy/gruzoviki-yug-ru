<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Brand\BrandResource;
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
            'brand' => new BrandResource($this->brand),
            'art' => $this->art,
            'property' => $this->properties,
            'popular' => $this->isPopular,
            'category' => new CategoryResource($this->category),
        ];
    }
}
