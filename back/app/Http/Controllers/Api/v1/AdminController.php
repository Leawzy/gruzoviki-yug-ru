<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //User section
    public function getAllUser($page = 1): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => User::paginate(15, ['*'], 'page', $page)
        ], 200);
    }

    public function getUser($id)
    {
        return User::findOrFail($id);
    }
    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'first_name' => ["required", "string"],
            'last_name' => ["required", "string"],
            'email' => ["required", "string"],
            'password' => ["required", "string"]
        ]);

        $user = User::create([
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
            $request['phoneNumber'] === null ?  : "phoneNumber" => $request['phoneNumber'],
            $request['role'] === null ?  : "role" => $request['role'],
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
            $request['firstName'] === null ?  : $user->firstName = $request['firstName'];
            $request['lastName'] === null ?  : $user->lastName = $request['lastName'];
            $request['email'] === null ?  : $user->email = $request['email'];
            $request['phoneNumber'] === null ?  : $user->phoneNumber = $request['phoneNumber'];
            $request['password'] === null ?  : $user->password = bcrypt($request['password']);
            $user->save();
            return response()->json([
                'message' => 'Данные успешно обновлены',
            ], 200);
        }

        return response()->json([
            'message' => 'User not found',
        ], 404);
    }

    //Product Section
        //Brand Section
    public function getAllBrand($page = 1)
    {
        return response()->json([
            'data' => Brand::paginate(15, ['*'], 'page', $page)
        ], 200);
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

        if($request->hasFile('file'))
        {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('brandImg/id'. $brand->id, $filename, 'public');
            $brand->img = 'brandImg/id'. $brand->id . '/' . $filename;
            $brand->save();
        }

        return response()->json([
            'message' => 'Бренд успешно добавлен'
        ], 200);
    }
}
