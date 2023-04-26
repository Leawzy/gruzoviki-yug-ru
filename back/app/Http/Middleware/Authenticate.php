<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo($request)
    {
        throw new HttpResponseException(response()->json([
            'error' => [
                'code' => 401,
                'message' => 'Вы должны авторизоваться.',
            ]
        ], 401));
    }
}
