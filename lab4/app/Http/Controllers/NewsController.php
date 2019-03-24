<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\News;

class NewsController extends Controller
{
    public function index(){
        $news = News::all();
        return $news;
    }

    public function create(Request $request){
        return News::create([
            'title' => $request->title,
            'text' => $request->text
        ]);
    }
    public function delete(Request $request){
        $news = News::where('title', $request->title)->delete();
        return 'deleted';
    }
}
