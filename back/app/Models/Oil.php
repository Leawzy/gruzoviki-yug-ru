<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oil extends Model
{
    use HasFactory;

    protected $fillable = [
        'characteristic_id',
        'product_id',
        'description',
        'warranty',
        'country',
        'startDate'
    ];
}
