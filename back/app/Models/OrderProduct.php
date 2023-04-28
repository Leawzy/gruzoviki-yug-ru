<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'orderId',
        'product_id'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'orderId');
    }
    protected function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
