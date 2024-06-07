<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController
{
    public function show() {
        return Inertia::render('Login');
  
    }
}
