<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {

        $data = $request->validate([
            "firstName" => ["required", "string"],
            "lastName" => ["required", "string"],
            "email" => ["required", "email", "string"],
            "password" => ["required", "confirmed"],
        ]);

        $user = User::create([
            "firstName" => $data["firstName"],
            "lastName" => $data["lastName"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
        ]);
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }

    public function authUser(Request $request)
    {
        // Получаем email и пароль из запроса
        $credentials = $request->only('email', 'password');

        try {
            // Проверяем email и пароль пользователя
            if (!$token = JWTAuth::attempt($credentials)) {
                // Если email или пароль неверны, возвращаем ошибку
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            // Если не удалось создать токен, возвращаем ошибку
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // Если проверка прошла успешно, возвращаем токен
        return response()->json(compact('token'));
    }
}
