<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class listOfCommands extends Model
{
    protected $table = 'listOfCommands';
    protected $fillable = [
        'idCommand', 'idProduct', 'quantity'
    ];
}
