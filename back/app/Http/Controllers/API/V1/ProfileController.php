<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    public function show_profile(Request $request)
    {
        $token = $request->bearerToken();

        $user = User::where(["api_token" => $token])->first();

        return response()->json([
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email
        ]);
    }

    public function change_password(Request $request)
    {
        $request->validate([
            'old_password' => ["required"],
            "new_password" => ["required"]
        ]);

        $token = $request->bearerToken();

        $user = User::where(["api_token" => $token])->first();

        if ($user->password === $request['old_password']){
            $user->password = bcrypt($request['new_password']);
            $user->save();
            return response()->json([
                'Пароль успешно изменен'
            ]);
        }
        else {
            return response()->json([
                'Неверный пароль'
            ]);
        }
    }
}
