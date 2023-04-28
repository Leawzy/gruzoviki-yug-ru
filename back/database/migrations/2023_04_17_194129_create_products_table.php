<?php

use App\Models\Brand;
use App\Models\Category;
use App\Models\Characteristic;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('title');
            $table->string('img')
                ->nullable();
            $table->string('shortDesc');

            $table->unsignedInteger('quantity')
                ->default(0);
            $table->unsignedInteger('price')
                ->default(0);
            $table->string('art');
            $table->json('properties')
                ->nullable();
            $table->boolean('isPopular')
                ->default(false);

            $table->foreignIdFor(Brand::class)
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignIdFor(Category::class)
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
        Schema::dropIfExists('products');
    }
};
