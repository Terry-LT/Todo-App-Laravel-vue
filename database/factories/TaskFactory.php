<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
           'name'=>$this->faker->name,
           'body'=>$this->faker->text,
           'done'=>$this->faker->numberBetween(0,1),
           
        ];
    }
}
