<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('Welcome');
Route::get('/login', [LoginController::class, 'create']);
Route::get('/signup', [RegistrationController::class, 'create']);
Route::post('/signup', [RegistrationController::class, 'store']);
require __DIR__.'/auth.php';
