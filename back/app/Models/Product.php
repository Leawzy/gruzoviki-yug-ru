<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'product_type',
        'short_desc',
        'description',
        'price',
        'quantity',
        'art',
        'brand',
        'country',
        'img'
    ];

    public function getImgUrlAttribute()
    {
        return '/public/storage/' . $this->img;
    }
}
