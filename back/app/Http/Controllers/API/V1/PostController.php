<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Post\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function showPosts()
    {
        return PostResource::collection(Post::all());
    }

    public function showPostId($id)
    {
        return new PostResource(Post::findOrFail($id));
    }
}
