<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="Gruzoviki-Yug API documentaion",
 *     version="1.0"
 * )
 * @OA\Server(
 *     description="Грузовики-ЮГ dev server",
 *     url="http://127.0.0.1:8000/api/"
 * )
 *  * @OA\Server(
 *     description="Грузовики-ЮГ prod server",
 *     url="https://api.грузовики-юг.рф/api/"
 * )
 * @OA\SecurityScheme(
 *     type="apiKey",
 *     in="header",
 *     name="Authorization",
 *     securityScheme="authorization"
 * )
 */

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
