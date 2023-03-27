<?php

namespace App\Http\Middleware;

use App\Models\AdminUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticateAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if ($token === null) {
            return response()->json([
                'error' => [
                    'code' => 401,
                    'message' => 'Вы не авторизованы!'
                ]
            ], 401);
        } else if (!AdminUser::where(["api_token" => $token])->first()) {
            return response()->json([
                'error' => [
                    'code' => 401,
                    'message' => 'Loading... Delete System32'
                ]
            ], 401);
        }

        return $next($request);
    }
}
