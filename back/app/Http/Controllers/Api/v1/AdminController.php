<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Brand\BrandResource;
use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Orders\OrderResource;
use App\Http\Resources\Other\PostResource;
use App\Http\Resources\Other\SliderResource;
use App\Http\Resources\Other\UserResource;
use App\Http\Resources\Product\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Feedback;
use App\Models\Order;
use App\Models\Post;
use App\Models\Product;
use App\Models\Repair;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    //User section
    public function getAllUser(): AnonymousResourceCollection
    {
        return UserResource::collection(User::all());
    }

    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'firstName' => ["required", "string"],
            'lastName' => ["required", "string"],
            'email' => ["required", "string"],
            'password' => ["required", "string"],
            'address' => ["required", "string"],
        ]);

        $user = User::create([
            "first_name" => $data["firstName"],
            "last_name" => $data["lastName"],
            "email" => $data["email"],
            "address" => $data['address'],
            "password" => bcrypt($data["password"]),
            $request['phoneNumber'] === null ?: "phone_number" => $request['phoneNumber'],
            $request['role'] === null ?: "role" => $request['role'],
        ]);
        $user->save();

        return response()->json([
            'message' => 'Пользователь успешно создан'
        ], 200);
    }

    public function changeUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user) {
            $request['firstName'] === null ?: $user->first_name = $request['firstName'];
            $request['lastName'] === null ?: $user->last_name = $request['lastName'];
            $request['email'] === null ?: $user->email = $request['email'];
            $request['address'] === null ?: $user->address = $request['address'];
            $request['phoneNumber'] === null ?: $user->phone_number = $request['phoneNumber'];
            $request['password'] === null ?: $user->password = bcrypt($request['password']);
            $request['role'] === null ?: $user->role = $request['role'];
            $user->save();
            return response()->json([
                'message' => 'Данные успешно обновлены',
            ], 200);
        }

        return response()->json([
            'message' => 'User not found',
        ], 404);
    }

    public function deleteUser(Request $request)
    {
        $user = User::findOrFail($request['id']);
        if ($user) {
            $user->delete();
        }

        return response()->json([
            'message' => 'Пользователь успешно удален',
        ]);
    }

    //Slider Section
    public function getAllSlider()
    {
        return SliderResource::collection(Slider::all());
    }

    public function createSlider(Request $request)
    {
        $data = $request->validate([
            'title' => ["required", "string"],
        ]);

        $slider = Slider::create([
            'title' => $data['title'],
        ]);

        $slider->save();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('sliderImg/id/' . $slider->id, $filename, 'public');
            $slider->img = 'sliderImg/id/' . $slider->id . '/' . $filename;
            $slider->save();
        }

        return response()->json([
            'message' => 'Компонент слайдера успешно добавлен'
        ], 200);
    }

    public function changeSlider(Request $request)
    {
        $slider = Slider::findOrFail($request['id']);

        if ($slider) {
            $request['title'] === null ?: $slider->title = $request['title'];
            $slider->save();

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('sliderImg/id/' . $slider->id, $filename, 'public');
                if ($slider->img) {
                    Storage::disk('public')->delete($slider->img);
                }
                $slider->img = 'sliderImg/id/' . $slider->id . '/' . $filename;
                $slider->save();
            }
        }

        return response()->json([
            'message' => 'Слайдер успешно обновлен',
        ]);
    }

    public function deleteSlider(Request $request)
    {
        $slider = Slider::findOrFail($request['id']);
        if ($slider) {
            $slider->delete();
        }

        return response()->json([
            'message' => 'Слайдер успешно удален',
        ]);
    }

    //Brand Section
    public function getAllBrand()
    {
        return BrandResource::collection(Brand::all());
    }

    public function createBrand(Request $request)
    {
        $data = $request->validate([
            'title' => ["required", "string"],
            'file' => ['required', 'image', 'max:2048'],
        ]);

        $brand = Brand::create([
            'title' => $data['title'],
        ]);

        $brand->save();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('brandImg/id/' . $brand->id, $filename, 'public');
            $brand->img = 'brandImg/id/' . $brand->id . '/' . $filename;
            $brand->save();
        }

        return response()->json([
            'message' => 'Бренд успешно добавлен'
        ], 200);
    }

    public function changeBrand(Request $request)
    {
        $brand = Brand::findOrFail($request['id']);

        if ($brand) {
            $request['title'] === null ?: $brand->title = $request['title'];
            $brand->save();
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('brandImg/id/' . $brand->id, $filename, 'public');
                if ($brand->img) {
                    Storage::disk('public')->delete($brand->img);
                }
                $brand->img = 'brandImg/id/' . $brand->id . '/' . $filename;
                $brand->save();
            }
        }

        return response()->json([
            'message' => 'Бренд успешно обновлен',
        ]);
    }

    public function deleteBrand(Request $request)
    {
        $brand = Brand::findOrFail($request['id']);
        if ($brand) {
            $brand->delete();
        }

        return response()->json([
            'message' => 'Бренд успешно удален',
        ]);
    }

    //Category Section
    public function getAllCategory()
    {
        return CategoryResource::collection(Category::all());
    }

    public function createCategory(Request $request)
    {
        $data = $request->validate([
            'title' => ["required", "string"],
            'property' => ["required"],
        ]);

        $category = Category::create([
            'title' => $data['title'],
            'properties' => $data['property'],
        ]);

        $category->save();

        return response()->json([
            'message' => 'Категория успешно добавлена'
        ], 200);
    }

    public function changeCategory(Request $request)
    {
        $category = Category::findOrFail($request['id']);
        if ($category) {
            $request['title'] === null ?: $category->title = $request['title'];
            $request['property'] === null ?: $category->properties = $request['property'];

            $category->save();
        }

        return response()->json([
            'message' => 'Категория успешно обновлена',
        ]);
    }

    public function deleteCategory(Request $request)
    {
        $category = Category::findOrFail($request['id']);
        if ($category) {
            $category->delete();
        }

        return response()->json([
            'message' => 'Категория успешно удалена',
        ]);
    }

    //Post Section
    public function getAllPost()
    {
        return PostResource::collection(Post::all());
    }

    public function createPost(Request $request)
    {
        $data = $request->validate([
            'title' => ["required", "string"],
            'file' => ['required', 'image', 'max:2048'],
            'shortDesc' => ["required", "string"],
            'description' => ["required", "string"],
        ]);

        $post = Post::create([
            'title' => $data['title'],
            'short_desc' => $data['shortDesc'],
            'description' => $data['description']
        ]);

        $post->save();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('postImg/id/' . $post->id, $filename, 'public');
            $post->img = 'postImg/id/' . $post->id . '/' . $filename;
            $post->save();
        }

        return response()->json([
            'message' => 'Пост успешно добавлен'
        ], 200);
    }

    public function changePost(Request $request)
    {
        $post = Post::findOrFail($request['id']);

        if ($post) {
            $request['title'] === null ?: $post->title = $request['title'];
            $request['shortDesc'] === null ?: $post->short_desc = $request['shortDesc'];
            $request['description'] === null ?: $post->description = $request['description'];
            $post->save();
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('postImg/id/' . $post->id, $filename, 'public');
                if ($post->img) {
                    Storage::disk('public')->delete($post->img);
                }
                $post->img = 'postImg/id/' . $post->id . '/' . $filename;
                $post->save();
            }
        }

        return response()->json([
            'message' => 'Пости успешно обновлен',
        ], 200);
    }

    public function deletePost(Request $request)
    {
        $post = Post::findOrFail($request['id']);
        if ($post) {
            $post->delete();
        }

        return response()->json([
            'message' => 'Пост успешно удален',
        ]);
    }

    //Product Section
    public function getAllProduct()
    {
        return ProductResource::collection(Product::all());
    }

    public function createProduct(Request $request)
    {
        $data = $request->validate([
            'title' => ["required", "string"],
            'shortDesc' => ["required", "string"],
            'price' => ["required", "integer"],
            'quantity' => ["required", "integer"],
            'art' => ["required", "integer"],
            'property' => ["required"],
            'isPopular' => ["required", "boolean"],
            'file' => ['required', 'image', 'max:2048'],
            'brandId' => ["required", "integer"],
            'categoryId' => ["required", "integer"],
        ]);

        $product = Product::create([
            'title' => $data['title'],
            'short_desc' => $data['shortDesc'],
            'price' => $data['price'],
            'quantity' => $data['quantity'],
            'art' => $data['art'],
            'properties' => $data['property'],
            'is_popular' => $data['isPopular'],
            'brand_id' => Brand::query()->where('id', $data['brandId'])->value('id'),
            'category_id' => Category::query()->where('id', $data['categoryId'])->value('id'),
        ]);

        $product->save();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('productImg/id/' . $product->id, $filename, 'public');
            $product->img = 'productImg/id/' . $product->id . '/' . $filename;
            $product->save();
        }

        return response()->json([
            'message' => 'Продукт успешно создан',
        ], 200);
    }

    public function changeProduct(Request $request)
    {
        $product = Product::findOrFail($request['id']);

        if ($product) {
            $request['title'] === null ?: $product->title = $request['title'];
            $request['shortDesc'] === null ?: $product->short_desc = $request['shortDesc'];
            $request['price'] === null ?: $product->price = $request['price'];
            $request['quantity'] === null ?: $product->quantity = $request['quantity'];
            $request['art'] === null ?: $product->art = $request['art'];
            $request['property'] === null ?: $product->properties = $request['property'];
            $request['isPopular'] === null ?: $product->is_popular = $request['isPopular'];
            $request['brandId'] === null ?: $product->brand_id = Brand::query()->where('id',
                $request['brandId'])->value('id');
            $request['categoryId'] === null ?: $product->category_id = Category::query()->where('id',
                $request['categoryId'])->value('id');
            $product->save();


            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('productImg/id/' . $product->id, $filename, 'public');
                if ($product->img) {
                    Storage::disk('public')->delete($product->img);
                }
                $product->img = 'productImg/id/' . $product->id . '/' . $filename;
                $product->save();
            }
        }

        return response()->json([
            'message' => 'Продукт успешно обновлен',
        ]);
    }

    public function deleteProduct(Request $request)
    {
        $product = Product::findOrFail($request['id']);
        if ($product) {
            $product->delete();
        }

        return response()->json([
            'message' => 'Продукт успешно удален',
        ]);
    }

    //Order section
    public function getAllOrder()
    {
        return OrderResource::collection(Order::all());
    }

    public function changeOrder(Request $request)
    {
        $order = Order::findOrFail($request['id']);

        if ($order) {
            $request['status'] === null ?: $order->status = $request['status'];

            $order->save();
        }

        return response()->json([
            'message' => 'Статус успешно изменен',
        ], 200);
    }

    public function deleteOrder(Request $request)
    {
        $order = Order::findOrFail($request['id']);
        if ($order) {
            $order->delete();
        }

        return response()->json([
            'message' => 'Заказ успешно удален',
        ]);
    }

    //Repair section
    public function getAllRecordRepair()
    {
        return Repair::all();
    }

    public function changeRecordRepair(Request $request)
    {
        $repair = Repair::findOrFail($request['id']);

        if ($repair) {
            $request['status'] === null ?: $repair->status = $request['status'];
            $request['date'] === null ?: $repair->date = $request['date'];
            $repair['type'] === null ?: $repair->type = $request['type'];

            $repair->save();
        }

        return response()->json([
            'message' => 'Запись успешно изменена',
        ], 200);
    }

    public function deleteRecordRepair(Request $request)
    {
        $repair = Repair::findOrFail($request['id']);
        if ($repair) {
            $repair->delete();
        }

        return response()->json([
            'message' => 'Запись на ремонт успешно удалена.',
        ]);
    }

    public function getFeedback()
    {
        return Feedback::all();
    }

    public function changeFeedback(Request $request)
    {
        $feedback = Feedback::findOrFail($request['id']);
        if ($feedback)
        {
            $request['status'] === null ?: $feedback->status = $request['status'];

            $feedback->save();
        }

        return response()->json([
            'message' => 'Статус успешно изменена',
        ], 200);
    }
}
