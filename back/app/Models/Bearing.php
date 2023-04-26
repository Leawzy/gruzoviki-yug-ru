<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bearing extends Model
{
    use HasFactory;

    protected $fillable = [
        'characteristic_id',
        'product_id',
        'description',
        'warranty',
        'size',
        'country',
        'startDate'
    ];
}
