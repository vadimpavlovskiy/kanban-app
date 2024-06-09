<?php

namespace Database\Factories;

use App\Models\Column;
use Illuminate\Database\Eloquent\Factories\Factory;

class ColumnFactory extends Factory
{
    protected $model = Column::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
        ];
    }
}
