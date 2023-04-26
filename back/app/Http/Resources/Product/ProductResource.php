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
    protected $related = [
        'oils' => OilResource::class,
        'bearing' => BearingResource::class,
        // Add more related models and their resource classes here
    ];

    public function toArray($request)
    {
        $properties = [];

        foreach ($this->related as $relationName => $resourceClass) {
            $relatedModels = $this->{$relationName};

            foreach ($relatedModels as $relatedModel) {
                $resource = new $resourceClass($relatedModel);
                $properties[] = $resource->toArray($request);
            }
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'shortDesc' => $this->shortDesc,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'img' => $this->imageUrl,
            'brand' => $this->brand->title,
            'art' => $this->art,
            'property' => $properties,
            'category' => new CategoryResource($this->category),
        ];
    }
}
