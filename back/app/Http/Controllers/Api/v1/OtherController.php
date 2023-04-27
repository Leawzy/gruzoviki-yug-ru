<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Other\PostResource;
use App\Http\Resources\Other\SliderResource;
use App\Models\Post;
use App\Models\Slider;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    public function showPost()
    {
        return PostResource::collection(Post::all());
    }

    public function getPostById($id)
    {
        return new PostResource(Post::findOrFail($id));
    }

    public function showSlider()
    {
        return SliderResource::collection(Slider::all());
    }
}
