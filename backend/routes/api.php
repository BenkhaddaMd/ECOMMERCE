<?php

use Illuminate\Http\Request;

Route::group([

    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');
    Route::post('resetPassword','ResetPassword@sendEmail');
    Route::post('changepassword','changePasswordController@change');
    Route::post('registerSocial','AuthController@register_social');
    Route::post('registerSocial_google','AuthController@register_social_google');
    Route::post('update_table_google/{id}','AuthController@update_table_google');
    Route::post('update_table_facebook/{id}','AuthController@update_table_facebook');
    Route::post('update_table_DB/{id}','AuthController@update_table_DB');
    Route::get('getData/{id}&{from}','AuthController@get_data');

    Route::get('profile/{email}', 'profileController@getInfo');

    Route::post('/send-sms',['as'=>'send.sms','uses'=>'SendSMSController@sendSMS']);

    Route::post('createCategory', 'product_categoryController@storeCategory');
    Route::post('createProduct', 'product_categoryController@storeProduct');
    Route::get('products', 'product_categoryController@getProducts');
    Route::get('product/{id}', 'product_categoryController@getProduct');

    Route::get('categories', 'product_categoryController@getCategories');
    Route::post('updateCategory', 'product_categoryController@updateCategory');
    Route::post('updateProduct', 'product_categoryController@updateProduct');
    Route::get('deleteProduct/{id}', 'product_categoryController@deleteProduct');
    Route::get('deleteCategory/{id}', 'product_categoryController@deleteCategory');
    Route::post('saveCommands', 'panierController@saveCommands');
    Route::post('saveLineCommand', 'panierController@saveLineCommand');
    Route::get('getCommands/{idUser}', 'panierController@getCommands');
    Route::get('getCommandsLines/{id}', 'panierController@getCommandsLines');
    Route::get('getThisProduct/{id}', 'panierController@getThisProduct');
    Route::get('getUserId/{email}', 'panierController@getUserId');

    
    
});
