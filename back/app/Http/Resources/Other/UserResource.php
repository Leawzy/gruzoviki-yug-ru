<?php

namespace App\Http\Resources\Other;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'firstName' => $this->first_name,
          'lastName' => $this->last_name,
          'email' => $this->email,
          'phoneNumber' => $this->phone_number,
          'address' => $this->address,
          'role' => $this->role,
        ];
    }
}
