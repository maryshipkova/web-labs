<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\News;

class NewsController extends Controller
{
    public function index(){
        $news = News::all();
        return view('news', [
            'news' => $news
          ]);
    }

    public function create(Request $request){
         News::create([
            'title' => $request->title,
            'text' => $request->text
        ]);
        return redirect('/news');
    }
    public function delete(Request $request){
        $news = News::where('id', $request->id)->delete();
        return redirect('/news');
    }
}
