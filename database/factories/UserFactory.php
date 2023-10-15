<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fname'          => fake()->firstName(),
            'lname'          => fake()->lastName(),
            'email'          => fake()->unique()->safeEmail(),
            'password'       => 'password', // will be hashed on creation because of the cast: check Models/User.php
            'remember_token' => Str::random(10),
        ];
    }
}
