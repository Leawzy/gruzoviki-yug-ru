<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function admin_auth(Request $request): \Illuminate\Http\JsonResponse
    {

        $request->validate([
            "login" => ["required", "string"],
            "password" => ["required"]
        ]);
        $admin_user = AdminUser::where(["login" => $request["login"]])->first();

        if (Auth::guard('admin')->attempt($request->only('login', 'password'))) {
            // TODO: сделать реворк данной функции
            $admin_user->api_token = Str::random(80);
            $admin_user->save();
            $admin_user = AdminUser::where(["login" => $request["login"]])->first();
            return response()->json([
                'token' => $admin_user->api_token
            ], 200);
        }
        throw ValidationException::withMessages([
            'login' => ['Данные введены не корренктно']
        ]);
    }
}
