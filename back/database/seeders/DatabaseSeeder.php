<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Property;
use App\Models\PropertyBearing;
use App\Models\PropertyOil;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Brand::factory()->create([
           'slug' => "test_brand",
           'title' => "test_brand"
        ]);

        Property::factory()
            ->create([
                'name' => 'Масло'
            ])
            ->create([
                'name' => 'Подшипник'
            ]);

        Category::factory(2)->create();

        Product::factory()
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'SINTEC PLATINUM 5W-40',
                'title' => 'SINTEC PLATINUM 5W-40',
                'short_desc' => 'Синтетическое 4 л',
                'quantity' => '10',
                'price' => '2019',
                'art' => '1',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->where('id', 1)->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Liqui Moly Optimal 10W-40',
                'title' => 'Liqui Moly Optimal 10W-40',
                'short_desc' => 'Полусинтетическое 4 л',
                'quantity' => '5',
                'price' => '3889',
                'art' => '2',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->where('id', 1)->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'short_desc' => 'Подшипник 3см',
                'quantity' => '3',
                'price' => '2500',
                'art' => '3',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->where('id', 2)->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'short_desc' => 'Подшипник 3см',
                'quantity' => '1',
                'price' => '2000',
                'art' => '4',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'SINTEC PLATINUM 5W-40',
                'title' => 'SINTEC PLATINUM 5W-40',
                'short_desc' => 'Синтетическое 4 л',
                'quantity' => '10',
                'price' => '2019',
                'art' => '1',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->where('id', 1)->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Liqui Moly Optimal 10W-40',
                'title' => 'Liqui Moly Optimal 10W-40',
                'short_desc' => 'Полусинтетическое 4 л',
                'quantity' => '5',
                'price' => '3889',
                'art' => '2',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->where('id', 1)->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'short_desc' => 'Подшипник 3см',
                'quantity' => '3',
                'price' => '2500',
                'art' => '3',
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'property_id' => Property::query()->where('id', 2)->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'short_desc' => 'Подшипник 3см',
                'quantity' => '1',
                'price' => '2000',
                'art' => '4',
            ]);


        PropertyOil::factory()
            ->create([
                'property_id' => Property::query()->inRandomOrder()->value('id'),
                'product_id' => Product::query()->where('id', 1)->value('id'),
                'description' => 'Производится из синтетических базовых масел и высокоэффективного многофункционального пакета присадок.',
                'warranty' => '6 месяцев',
                'country' => 'Россия',
                'start_date' => '23 год'
            ])
            ->create([
                'property_id' => Property::query()->inRandomOrder()->value('id'),
                'product_id' => Product::query()->where('id', 2)->value('id'),
                'description' => 'Полусинтетическое моторное масло с адаптированным для российских условий пакетом присадок',
                'warranty' => '6 месяцев',
                'country' => 'Россия',
                'start_date' => '22 год'
            ]);

        PropertyBearing::factory()
            ->create([
                'property_id' => Property::query()->inRandomOrder()->value('id'),
                'product_id' => Product::query()->where('id', 3)->value('id'),
                'description' => 'Подшипник',
                'warranty' => '1 год',
                'country' => 'Германия',
                'size' => '3см',
                'start_date' => '22 год'
            ]);
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
