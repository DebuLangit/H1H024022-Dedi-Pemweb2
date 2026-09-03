<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'nama' => 'Dedi',
        'nim'  => 'H1H024022',
    ]);
});