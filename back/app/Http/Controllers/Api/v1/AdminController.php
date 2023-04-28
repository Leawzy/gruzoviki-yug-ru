<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //User section
    public function getAllUser(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => User::paginate(15)
        ], 200);
    }

    public function getUser($id)
    {
        return User::findOrFail($id);
    }
    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'id' => ["required"],
            'first_name' => ["required", "string"],
            'last_name' => ["required", "string"],
            'email' => ["required", "string"],
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
}
