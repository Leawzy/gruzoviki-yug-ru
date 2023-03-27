<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'short_desc',
        'description',
        'img'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Post $post) {
            $post->slug = $post->slug ?? str($post->title)->slug();
        });
    }

    public function getImageUrlAttribute()
    {
       return url('storage/' . $this->img);
    }
}
