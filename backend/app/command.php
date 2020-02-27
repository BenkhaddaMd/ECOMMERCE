<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class command extends Model
{
    protected $table = 'commands';
    protected $fillable = [
        'idUser', 'fullname', 'email', 'numero', 'address', 'city', 'country', 'paymentWay'
    ];
}