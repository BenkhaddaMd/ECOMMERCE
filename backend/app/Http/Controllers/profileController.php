<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class profileController extends Controller
{
    public function getInfo($email)
    {
        $userInfo = DB::table('users')->where('email', $email)->first();

        return [
            'first_name'=>$userInfo->first_name,
            'last_name'=>$userInfo->last_name,
            'address'=>$userInfo->address,
            'email'=>$userInfo->email,
            'city'=>$userInfo->city,
            'phone'=>$userInfo->phone

        ];
    }
}
