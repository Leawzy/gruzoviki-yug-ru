<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BearingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'description' => $this->description,
            'warranty' => $this->warranty,
            'country' => $this->country,
            'size' => $this->size,
            'startDate' => $this ->startDate
        ];
    }
}
