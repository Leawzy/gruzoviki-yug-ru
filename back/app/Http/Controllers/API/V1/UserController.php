<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * @OA\Post(
     *     path="/register",
     *     operationId="registerUser",
     *     tags={"Users"},
     *     summary="Create new user",
     *     @OA\Response(
     *          response="201",
     *          description="Successful operation",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(type="boolean", property="success", example="true"),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response="400",
     *          description="Bad Request",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(type="boolean", property="success", example="false"),
     *                  @OA\Property(type="array", property="error", @OA\Items(type="string", example="Вопросы?")),
     *              )
     *          )
     *     )
     * )
     */

    public function register(Request $request)
    {

        $data = $request->validate([
            "first_name" => ["required", "string"],
            "last_name" => ["required", "string"],
            "email" => ["required", "email", "string"],
            "record_book" => ["required", "string"],
            "password" => ["required", "confirmed"],
        ]);

        $user = User::create([
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "email" => $data["email"],
            "record_book" => $data["record_book"],
            "password" => bcrypt($data["password"]),
        ]);
        $user->api_token = Str::random(80);
        $user->save();

        return response()->json([
            'token' => $user->api_token
        ], 201);
    }

    /**
     * @throws ValidationException
     *
     * @OA\Post(
     *     path="/login",
     *     operationId="loginUser",
     *     tags={"Users"},
     *     summary="login user",
     *     @OA\Response(
     *          response="200",
     *          description="Successful operation",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(type="boolean", property="success", example="true"),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response="400",
     *          description="Bad Request",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(type="boolean", property="success", example="false"),
     *                  @OA\Property(type="array", property="error", @OA\Items(type="string", example="Вопросы?")),
     *              )
     *          )
     *     )
     * )
     */
    public function login(Request $request)
    {

        $request->validate([
            "email" => ["required", "string"],
            "password" => ["required"]
        ]);
        $user = User::where(["email" => $request["email"]])->first();

        if (Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'token' => $user->api_token
            ], 200);
        }
        throw ValidationException::withMessages([
            'email' => ['Данные введены не корренктно']
        ]);
    }
}
