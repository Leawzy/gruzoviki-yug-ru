<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Post;
use App\Models\Product;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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

        Category::factory(2)->create();

        $propertyOil = [
            'description' => 'Производится из синтетических базовых масел и высокоэффективного многофункционального пакета присадок.',
            'warranty' => '6 месяцев',
            'country' => 'Россия',
            'startDate' => '23 год'
        ];
        $propertyBearing = [
            'description' => 'Подшипник',
            'warranty' => '1 год',
            'country' => 'Германия',
            'size' => '3см',
            'start_date' => '22 год'
        ];

        Product::factory()
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'SINTEC PLATINUM 5W-40',
                'title' => 'SINTEC PLATINUM 5W-40',
                'shortDesc' => 'Синтетическое 4 л',
                'quantity' => '10',
                'price' => '2019',
                'art' => '1',
                'img' => 'productImg/tovar-1.svg',
                'isPopular' => true,
                'properties' => $propertyOil
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Liqui Moly Optimal 10W-40',
                'title' => 'Liqui Moly Optimal 10W-40',
                'shortDesc' => 'Полусинтетическое 4 л',
                'quantity' => '5',
                'price' => '3889',
                'art' => '2',
                'img' => 'productImg/tovar-1.svg',
                'properties' => $propertyOil,

            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'shortDesc' => 'Подшипник 3см',
                'quantity' => '3',
                'price' => '2500',
                'art' => '3',
                'img' => 'productImg/tovar-1.svg',
                'isPopular' => true,
                'properties' => $propertyBearing
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'shortDesc' => 'Подшипник 3см',
                'quantity' => '1',
                'price' => '2000',
                'art' => '4',
                'img' => 'productImg/tovar-1.svg',
                'properties' => $propertyBearing
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'SINTEC PLATINUM 5W-40',
                'title' => 'SINTEC PLATINUM 5W-40',
                'shortDesc' => 'Синтетическое 4 л',
                'quantity' => '10',
                'price' => '2019',
                'art' => '1',
                'img' => 'productImg/tovar-1.svg',
                'properties' => $propertyOil
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Liqui Moly Optimal 10W-40',
                'title' => 'Liqui Moly Optimal 10W-40',
                'shortDesc' => 'Полусинтетическое 4 л',
                'quantity' => '5',
                'price' => '3889',
                'art' => '2',
                'img' => 'productImg/tovar-1.svg',
                'properties' => $propertyOil
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'shortDesc' => 'Подшипник 3см',
                'quantity' => '3',
                'price' => '2500',
                'art' => '3',
                'img' => 'productImg/tovar-1.svg',
                'properties' => $propertyBearing
            ])
            ->create([
                'brand_id' => Brand::query()->inRandomOrder()->value('id'),
                'category_id' => Category::query()->inRandomOrder()->value('id'),
                'slug' => 'Подшипник 1',
                'title' => 'Подшипник 1',
                'shortDesc' => 'Подшипник 3см',
                'quantity' => '1',
                'price' => '2000',
                'art' => '4',
                'img' => 'productImg/tovar-1.svg',
                'properties' => $propertyBearing
            ]);



        Post::factory()
            ->create([
                'slug' => 'Post 1',
                'title' => 'Post 1',
                'shortDesc' => 'Я пост 1',
                'description' => 'Я пост 1 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/remgruzo-01.jpg'
            ])
            ->create([
                'slug' => 'Post 2',
                'title' => 'Post 2',
                'shortDesc' => 'Я пост 2',
                'description' => 'Я пост 2 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/97b3d592deb17167ac8560466a1b7dd6.jpg'
            ])
            ->create([
                'slug' => 'Post 3',
                'title' => 'Post 3',
                'shortDesc' => 'Я пост 3',
                'description' => 'Я пост 3 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/56403082e3eb70182b6d30d2d5ab8536.jpg'
            ])
            ->create([
                'slug' => 'Post 4',
                'title' => 'Post 4',
                'shortDesc' => 'Я пост 4',
                'description' => 'Я пост 4 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/161e43dd7d19b8a88b80e035aa9b47c9.jpg'
            ])
            ->create([
                'slug' => 'Post 5',
                'title' => 'Post 5',
                'shortDesc' => 'Я пост 5',
                'description' => 'Я пост 5 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/075280feb9162bfd2dbc21424641488a.jpg'
            ])
            ->create([
                'slug' => 'Post 6',
                'title' => 'Post 6',
                'shortDesc' => 'Я пост 6',
                'description' => 'Я пост 6 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/6cdbbda2cfdfaa669eda140f23092b11.jpg'
            ])
            ->create([
                'slug' => 'Post 7',
                'title' => 'Post 7',
                'shortDesc' => 'Я пост 7',
                'description' => 'Я пост 7 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/ef898b90570442e1466a107d8d5cc3ce.jpg'
            ])
            ->create([
                'slug' => 'Post 8',
                'title' => 'Post 8',
                'shortDesc' => 'Я пост 8',
                'description' => 'Я пост 8 привет мой дорой друг сегодня мы поговорим как ты меня видишь',
                'img' => 'postImg/ddb73ff7e277a6cc1fbede190d79648d.jpg'
            ]);

        Slider::factory()
            ->create([
                'name' => 'slider1',
                'img' => 'sliderImg/slide1.png'
            ])
            ->create([
                'name' => 'slider2',
                'img' => 'sliderImg/slide2.png'
            ]);

        User::factory()
            ->create([
                'firstName' => 'Admin',
                'lastName' => 'Adminov',
                'email' => 'admin@admin.ru',
                'password' => bcrypt(12345),
                'role' => 'admin',
            ]);


//         User::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
