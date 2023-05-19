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
            'slug' => $this->slug,
            'title' => $this->title,
            'shortDesc' => $this->short_desc,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'img' => $this->img === null ? null : $this->imageUrl,
            'brand' => new BrandResource($this->brand),
            'art' => $this->art,
            'property' => $this->properties,
            'popular' => $this->is_popular,
            'category' => new CategoryResource($this->category),
        ];
    }
}
