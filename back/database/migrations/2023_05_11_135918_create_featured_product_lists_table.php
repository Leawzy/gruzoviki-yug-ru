<?php

use App\Models\FeaturedProduct;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('featured_product_lists', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('featured_products_id')
                ->nullable();
            $table->foreign('featured_products_id')
                ->references('id')
                ->on('featured_products');

            $table->foreignIdFor(Product::class)
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('featured_product_lists');
    }
};
