<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    public function getUserProfile()
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        return [
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'phoneNumber' => $user->phoneNumber
        ];
    }

    public function changeUserPassword(Request $request)
    {
        $request->validate([
            'oldPassword' => ["required"],
            "newPassword" => ["required"]
        ]);

        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 404);
        }

        if (Hash::check($request['oldPassword'], $user->password)) {
            $user->password = bcrypt($request['newPassword']);
            $user->save();
            return response()->json([
                'message' => 'Password changed successfully.'
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }
    }

    public function updateUserData(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        if ($user) {
            $request['firstName'] === null ?  : $user->firstName = $request['firstName'];
            $request['lastName'] === null ?  : $user->lastName = $request['lastName'];
            $request['email'] === null ?  : $user->email = $request['email'];
            $request['phoneNumber'] === null ?  : $user->phoneNumber = $request['phoneNumber'];
            $user->save();
            return response()->json([
                'message' => 'Данные успешно обновлены',
            ], 200);
        }

        return response()->json([
            'message' => 'Ошибка'
        ], 400);
    }
}
