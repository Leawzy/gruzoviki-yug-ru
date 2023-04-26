<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request): \Illuminate\Http\JsonResponse
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
}
