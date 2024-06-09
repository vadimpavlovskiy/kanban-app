<?php

namespace Database\Seeders;

use App\Models\Column;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColumnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        // Iterate over each user and create columns for them
        $users->each(function ($user) {
            Column::factory(5)->create(['user_id' => $user->id]);
        });

    }
}
