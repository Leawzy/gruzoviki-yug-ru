<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function showPosts()
    {
        $data = Post::all();

        return response()->json([
            'data' => $data
        ]);
    }

    public function showPostId($id)
    {
        return Post::findOrFail($id);
    }
}
