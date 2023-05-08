<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/profile",
     *     security={{"bearerAuth":{}}},
     *     operationId="getUserProfile",
     *     tags={"Profile"},
     *     summary="Get user profile",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(type="integer", property="id"),
     *                 @OA\Property(type="string", property="firstName"),
     *                 @OA\Property(type="string", property="lastName"),
     *                 @OA\Property(type="string", property="email"),
     *                 @OA\Property(type="string", property="phoneNumber"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(type="boolean", property="success", example=false),
     *             @OA\Property(type="string", property="error", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *         @OA\JsonContent(
     *             @OA\Property(type="boolean", property="success", example=false),
     *             @OA\Property(type="string", property="error", example="User not found")
     *         )
     *     )
     * )
     */
    public function getUserProfile()
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        return [
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'phoneNumber' => $user->phoneNumber,
            'role' => $user->role
        ];
    }

    /**
     * @OA\Patch(
     *     path="/profile/change/password",
     *     summary="Change user password",
     *     description="Changes the password of the authenticated user.",
     *     operationId="changePassword",
     *     tags={"Profile"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="oldPassword",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="newPassword",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Password changed successfully.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Password changed successfully."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Invalid credentials.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Invalid credentials."
     *             )
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Patch(
     *     path="/profile/change/info",
     *     summary="Updates user profile data",
     *     tags={"Profile"},
     *     operationId="changeInfo",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/x-www-form-urlencoded",
     *             @OA\Schema(
     *                 type="object",
     *                 @OA\Property(
     *                     property="firstName",
     *                     description="User's first name",
     *                     type="string",
     *                     example="John"
     *                 ),
     *                 @OA\Property(
     *                     property="lastName",
     *                     description="User's last name",
     *                     type="string",
     *                     example="Doe"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     description="User's email address",
     *                     type="string",
     *                     example="johndoe@example.com"
     *                 ),
     *                 @OA\Property(
     *                     property="phoneNumber",
     *                     description="User's phone number",
     *                     type="string",
     *                     example="+1 (555) 123-4567"
     *                 ),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User profile data updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Данные успешно обновлены"
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Failed to update user profile data",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Ошибка"
     *             ),
     *         ),
     *     ),
     * )
     */
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
