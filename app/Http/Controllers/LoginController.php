<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController
{
    public function create() {
        return Inertia::render('Login');
    }
    public function store() {
        return Inertia::render('Signup');
    }
}
