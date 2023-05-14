<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'img',
        'short_desc',
        'quantity',
        'price',
        'art',
        'brand_id',
        'category_id',
        'properties',
        'is_popular',
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($product) {
            $product->slug = $product->slug ?? Str::slug($product->title);
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function getImageUrlAttribute()
    {
        return url('storage/' . $this->img);
    }

    //Filter
    public function scopeFilter($query, $params)
    {
        // Фильтрация по категории
        if (isset($params['category_id'])) {
            if (is_array($params['category_id'])) {
                $query->whereIn('category_id', $params['category_id']);
            } else {
                $query->where('category_id', $params['category_id']);
            }
        }

        // Фильтрация по бренду
        if (isset($params['brand_id'])) {
            if (is_array($params['brand_id'])) {
                $query->whereIn('brand_id', $params['brand_id']);
            } else {
                $query->where('brand_id', $params['brand_id']);
            }
        }

        // Фильтрация по минимальной цене
        if (isset($params['minPrice'])) {
            $query->where('price', '>=', $params['minPrice']);
        }

        // Фильтрация по максимальной цене
        if (isset($params['maxPrice'])) {
            $query->where('price', '<=', $params['maxPrice']);
        }

        // Фильтрация по диапазону цен
        if (isset($params['price_range'])) {
            $prices = explode('-', $params['price_range']);
            if (count($prices) == 2) {
                $query->whereBetween('price', $prices);
            }
        }

        // Сортировка результатов
        if (isset($params['sort_by'])) {
            $sortField = $params['sort_by'];
            $sortOrder = isset($params['sort_order']) && $params['sort_order'] == 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortField, $sortOrder);
        }

        return $query;
    }
}
