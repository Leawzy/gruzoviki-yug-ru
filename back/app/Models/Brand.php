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

    public function getImageUrlAttribute()
    {
        return url('storage/' . $this->img);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function delete()
    {
        if ($this->products()->exists()) {
            // Если на бренд есть ссылки из таблицы products, выбрасываем исключение
            throw new \Exception('Нельзя удалить бренд, на который ссылаются продукты.');
        }

        return parent::delete();
    }
}
