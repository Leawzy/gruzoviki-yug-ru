<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'img'
    ];
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($brand) {
            $brand->slug = $brand->slug ?? Str::slug($brand->title);
        });
    }
}
