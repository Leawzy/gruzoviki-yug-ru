<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "title",
        "properties"
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($category) {
            $category->slug = $category->slug ?? Str::slug($category->title);
        });
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function delete()
    {
        if ($this->products()->exists()) {
            // Если на категорию есть ссылки из таблицы products, выбрасываем исключение
            throw new \Exception('Нельзя удалить категорию, на которую ссылаются продукты.');
        }

        return parent::delete();
    }
}
