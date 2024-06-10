<?php

namespace App\Http\Controllers;

use App\Models\Column;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController
{
    public function store(Column $column) {
        Task::create([
            'title'=>'A New Task',
            'body'=>'A Task Body',
            'column_id'=>$column->id
        ]);

        return to_route('Dashboard');
    }
    public function update(Request $request, Task $task) {
        $attributes = $request->validate([
            'title'=>'string | required | max:255',
            'body'=>'string',
            'updated_at'=>'date'
        ]);
        $task->update($attributes);
        return to_route('Dashboard');
    }

    public function destroy(Task $task) {

        if(! Auth::user()) {
            return back()->withErrors(['error'=>'You not eligiable to make this action!']);
        }
       $task->delete();
       
       return to_route('Dashboard');
    }
}
