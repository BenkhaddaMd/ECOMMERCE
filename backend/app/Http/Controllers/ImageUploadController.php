<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function imageUploadPost(Request $request)
    {
     
        if($request->file('image'))
        {
        $image = $request->image;
        $extension = $image->getClientOriginalExtension();
        

        //$imageName = time().'.'.$extension;  
        $imageName = $image->getClientOriginalName();
   
        $path = $request->file('image')->move(public_path('../../frontend/src/assets/images'), $imageName);
        }
        return 1;
   
    }
}
