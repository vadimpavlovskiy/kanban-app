<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class RegistrationController
{
    public function create() {
        return Inertia::render('Signup');
    }
    public function store(Request $request) {
        $validated = $request->validate([
            'first_name' => 'required | max:255 | min:2',
            'second_name' => 'required | max:255 | min:2',
            'email' => 'required | max:255 | email',
            'password' => ['required', 'confirmed', Password::min(6)]
        ]);
        $user = User::create($validated);
        Auth::login($user);

        return to_route('Welcome');
    }
}
