<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'shortDesc',
        'description',
        'img'
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($post) {
            $post->slug = $post->slug ?? Str::slug($post->title);
        });
    }
}
