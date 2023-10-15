<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title'      => fake()->sentence(),
            'text'       => fake()->text(300),
            'stars'      => fake()->numberBetween(4, 5),
            'product_id' => Product::all()->random()->id,
            'user_id'    => User::all()->random()->id,
        ];
    }
}
