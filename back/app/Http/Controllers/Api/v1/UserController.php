<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{

    /**
     * @OA\Post(
     *     path="/register",
     *     summary="Create a new user",
     *     tags={"Users"},
     *     operationId="createUser",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="firstName", type="string", example="John"),
     *                 @OA\Property(property="lastName", type="string", example="Doe"),
     *                 @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
     *                 @OA\Property(property="password", type="string", example="password123"),
     *                 @OA\Property(property="password_confirmation", type="string", example="password123"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string", example="JWT Token"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="array", @OA\Items(type="string", example="The given data was invalid.")),
     *         ),
     *     ),
     * )
     */
    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {

        $data = $request->validate([
            "firstName" => ["required", "string"],
            "lastName" => ["required", "string"],
            "email" => ["required", "email", "string"],
            "password" => ["required", "confirmed"],
        ]);

        $user = User::create([
            "first_name" => $data["firstName"],
            "last_name" => $data["lastName"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
        ]);
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }

    /**
     * @OA\Post(
     *     path="/login",
     *     summary="Authenticate user",
     *     operationId="authUser",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="JSON payload with email and password",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"email", "password"},
     *                 @OA\Property(
     *                     property="email",
     *                     type="string",
     *                     format="email",
     *                     description="Email address of the user"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string",
     *                     description="Password of the user"
     *                 ),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful authentication",
     *         @OA\JsonContent(
     *             required={"success", "token"},
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 description="Status of successful authentication"
     *             ),
     *             @OA\Property(
     *                 property="token",
     *                 type="string",
     *                 description="API token of the user"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *         @OA\JsonContent(
     *             required={"error"},
     *             @OA\Property(
     *                 property="error",
     *                 type="string",
     *                 description="Invalid credentials"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *         @OA\JsonContent(
     *             required={"success", "errors"},
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 description="Status of successful authentication"
     *             ),
     *             @OA\Property(
     *                 property="errors",
     *                 type="array",
     *                 description="Array of errors",
     *                 @OA\Items(
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Bad request",
     *         @OA\JsonContent(
     *             required={"success", "errors"},
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 description="Could not create token"
     *             ),
     *             @OA\Property(
     *                 property="errors",
     *                 type="array",
     *                 description="Array of errors",
     *                 @OA\Items(
     *                     type="string"
     *                 )
     *             )
     *         )
     *     )
     * )
     */
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
