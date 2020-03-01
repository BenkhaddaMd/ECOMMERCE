<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use  App\Http\Requests\categoryRequest;
use  App\Http\Requests\productRequest;

use App\Category;
use App\Product;
use Illuminate\Support\Facades\DB;


class product_categoryController extends Controller
{
    function storeCategory(categoryRequest $request)
    {

        $cat = new Category;
        $cat->name = $request->name;
        $cat->description = $request->description;
        $cat->save();
        return $cat;

    }

    function storeProduct(productRequest $request)
    {

        $pro = new Product;
        $pro->name = $request->name;
        $pro->description = $request->description;
        $pro->category = $request->category;
        $pro->price = $request->price;
        $pro->color = $request->color;
        $pro->quantity = $request->quantity;
        $pro->image = $request->image;
        $pro->save();
       return $pro;
    }
    function getProduct($id)
    {
        $product = Product::where('id', $id)->first();
        return $product;
    }

    function getProducts()
    {
        $allProducts = Product::all();
        
        return $allProducts;
    }

    function getCategories()
    {
        $allCategories = Category::all();
        return $allCategories;
    }

    function updateCategory(Request $request)
    {
        $oldCat= Category::findOrFail($request->id)->name;

        DB::table('category')
                ->where('id', $request->id)
                ->update([
                'name'=>$request->name,
                'description'=>$request->description,
                ]);

        DB::table('products')
                ->where('category', $oldCat)
                ->update([
                'category'=>$request->name,
                ]);
    }

    function updateProduct(Request $request)
    {
        DB::table('Products')
                ->where('id', $request->id)
                ->update([
                'name'=>$request->name,
                'category'=>$request->category,
                'description'=>$request->description,
                'price'=>$request->price,
                'color'=>$request->color,
                'quantity'=>$request->quantity,

                ]);
    }

    
    function deleteProduct($id)
    {
        Product::where('id', $id)->delete();

    }
      
    function deleteCategory($id)
    {
        $catName= Category::findOrFail($id)->name;
        Category::where('id', $id)->delete();
        Product::where('category', $catName)->delete();

    }
}
