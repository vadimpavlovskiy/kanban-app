<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController
{
    public function create() {
        return Inertia::render('Login');
    }
    public function store(Request $request) {    
        $attributes = $request->validate([
            'email' => 'required | email',
            'password' => 'required'
        ]);

        if(Auth::attempt($attributes)) {
            $request->session()->regenerate();
            return to_route('Dashboard');
        };
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records. Please, try again!',
        ])->onlyInput('email');
    }
    public function destroy(Request $request) {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('Welcome');
    }
}
