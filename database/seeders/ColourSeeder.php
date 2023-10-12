<?php

namespace Database\Seeders;

use App\Enums\ColourEnum;
use App\Models\Colour;
use Illuminate\Database\Seeder;

class ColourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colours = [
            ['value' => 'black', 'hex_code' => '#000000'],
            ['value' => 'orange', 'hex_code' => '#F26B26'],
            ['value' => 'blue', 'hex_code' => '#1590C8'],
            ['value' => 'brown', 'hex_code' => '#815D41'],
            ['value' => 'green', 'hex_code' => '#7BB93C'],
            ['value' => 'grey', 'hex_code' => '#808080'],
            ['value' => 'pink', 'hex_code' => '#F0728F'],
            ['value' => 'purple', 'hex_code' => '#8C429F'],
            ['value' => 'red', 'hex_code' => '#E7352B'],
            ['value' => 'white', 'hex_code' => '#ffffff'],
            ['value' => 'yellow', 'hex_code' => '#FDD533'],
        ];

        foreach ($colours as $colour) {
            Colour::create($colour);
        }
    }
}
