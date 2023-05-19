<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $propertyOil = [
            'description' => 'Производится из синтетических базовых масел и высокоэффективного многофункционального пакета присадок.',
            'warranty' => '6 месяцев',
            'country' => 'Россия',
            'startDate' => '23 год'
        ];
        return [
            'brand_id' => Brand::query()->inRandomOrder()->value('id'),
            'category_id' => Category::query()->where('id', 1)->value('id'),
            'title' => 'SINTEC PLATINUM 5W-40',
            'short_desc' => 'Синтетическое 4 л',
            'quantity' => '10',
            'price' => '2019',
            'art' => '1',
            'img' => 'productImg/tovar-1.svg',
            'is_popular' => false,
            'properties' => $propertyOil
        ];
    }
}
