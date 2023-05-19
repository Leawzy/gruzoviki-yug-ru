<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    protected function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
