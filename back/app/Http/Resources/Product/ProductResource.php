<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Property\PropertyBearingResource;
use App\Http\Resources\Property\PropertyOilResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    protected $related = [
        'oils' => PropertyOilResource::class,
        'bearing' => PropertyBearingResource::class,
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
            'short_desc' => $this->short_desc,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'img' => $this->imgUrl,
            'brand' => $this->brand->title,
            'art' => $this->art,
            'property' => $properties,
            'category' => new CategoryResource($this->category),
        ];
    }
}
