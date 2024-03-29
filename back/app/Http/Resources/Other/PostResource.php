<?php

namespace App\Http\Resources\Other;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'description' => $this->description,
            'img' => $this->imageUrl,
            'createdAt' => $this->created_at
        ];
    }
}
