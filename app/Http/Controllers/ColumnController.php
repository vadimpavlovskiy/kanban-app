<?php

namespace App\Http\Controllers;

use App\Models\Column;
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
    public function update(Request $request, Column $column) {
        $attributes = $request->validate([
            'title' => 'required'
        ]);
        $column->update($attributes);
        return to_route('Dashboard');
    }

    public function destroy(Request $request, Column $column) {

        if(Auth::user()->id !== $column->user_id) {
            return response()->json(['error'=> 'Unathorized', 403]);
        }
       $column->delete();
       
       return to_route('Dashboard');
    }
    public function store(Request $request) {
        $user = Auth::user();

        Column::create([
            'title' => "A New Column",
            'user_id' => $user->id
        ]);

        return to_route('Dashboard');
    }
}
