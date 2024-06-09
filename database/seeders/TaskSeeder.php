<?php

namespace Database\Seeders;

use App\Models\Column;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $columns = Column::all();
        $columns->each(function ($column) {
            Task::factory(10)->create(['column_id' => $column->id]);
        });
    }
}
