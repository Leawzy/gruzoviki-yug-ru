<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyBearing extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'product_id',
        'description',
        'warranty',
        'size',
        'country',
        'start_date'
    ];
}
