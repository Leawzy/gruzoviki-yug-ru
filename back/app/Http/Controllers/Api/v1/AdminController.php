<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Brand\BrandResource;
use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Other\SliderResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    //User section
    public function getAllUser(): \Illuminate\Database\Eloquent\Collection
    {
        return User::all();
    }

    public function getUser($id)
    {
        return User::findOrFail($id);
    }

    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'firstName' => ["required", "string"],
            'lastName' => ["required", "string"],
            'email' => ["required", "string"],
            'password' => ["required", "string"]
        ]);

        $user = User::create([
            "firstName" => $data["firstName"],
            "lastName" => $data["lastName"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
            $request['phoneNumber'] === null ? : "phoneNumber" => $request['phoneNumber'],
            $request['role'] === null ? : "role" => $request['role'],
        ]);
        $user->save();

        return response()->json([
            'message' => 'Пользователь успешно создан'
        ], 200);
    }

    public function changeUser(Request $request)
    {
        $user = User::findOrFail($request['id']);

        if ($user) {
            $request['firstName'] === null ? : $user->firstName = $request['firstName'];
            $request['lastName'] === null ? : $user->lastName = $request['lastName'];
            $request['email'] === null ? : $user->email = $request['email'];
            $request['phoneNumber'] === null ? : $user->phoneNumber = $request['phoneNumber'];
            $request['password'] === null ? : $user->password = bcrypt($request['password']);
            $request['role'] === null ? : $user->role = $request['role'];
            $user->save();
            return response()->json([
                'message' => 'Данные успешно обновлены',
            ], 200);
        }

        return response()->json([
            'message' => 'User not found',
        ], 404);
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

        $request['title'] === null ?: $slider->title = $request['title'];

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

        return response()->json([
            'message' => 'Слайдер успешно обновлен',
            $slider->img,
            $slider->title
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

        $request['title'] === null ? : $brand->title = $request['title'];
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

        return response()->json([
            'message' => 'Бренд успешно обновлен',
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

        $request['title'] === null ? : $category->title = $request['title'];
        $request['property'] === null ? : $category->properties = $request['property'];

        return response()->json([
            'message' => 'Категория успешно обновлена',
        ]);
    }

    //Product Section

}
