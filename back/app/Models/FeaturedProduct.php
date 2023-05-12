<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeaturedProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];

    public function featuredProduct(): HasMany
    {
        return $this->hasMany(FeaturedProductList::class, 'featured_products_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
