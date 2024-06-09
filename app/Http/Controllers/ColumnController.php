<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ColumnController
{
    public function index() {
        $user = Auth::user();
        // This if statment to prevent Intelephense throw an error, but it's okay, don't worry
        if ($user !== null && $user instanceof User) {
            $columns = $user->columns()->with('tasks')->get();
            return Inertia::render('Dashboard', [
                'columnsData' => $columns,
            ]);
         }
    }
}
