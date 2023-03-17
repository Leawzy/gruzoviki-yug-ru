<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('product_type_id');
            $table->string('short_desc');
            $table->string('description');
            $table->string('price');
            $table->string('new_price');
            $table->string('old_price');
            $table->string('quantity');
            $table->string('art');
            $table->string('brand_id');
            $table->string('country_id');
            $table->string('img');
            $table->string('discount');
            $table->string('new');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
