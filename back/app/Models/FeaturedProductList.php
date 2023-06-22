<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeaturedProductList extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'featured_products_id'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'featured_products_id');
    }

    protected function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
