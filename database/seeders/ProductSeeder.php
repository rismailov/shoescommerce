<?php

namespace Database\Seeders;

use App\Enums\CategoryEnum;
use App\Models\Colour;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // looks like: [['s' => 1], ['m' => 2], ...]
        $sizes = Size::select(['id', 'value'])->pluck('id', 'value');

        // looks like: [['white' => 1], ['black' => 2], ...]
        $colours = Colour::select(['id', 'value'])->pluck('id', 'value');

        $products = [
            // Activewear
            [
                'name'        => 'White Active Crew Neck',
                'description' => 'White Active Crew Neck',
                'price'       => 30,
                'category'    => CategoryEnum::ACTIVEWEAR->value,
                'colour'      => 'white',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => 'seeder/products/activewear/white',
            ],

            [
                'name'        => 'Burgundy Active Crew Neck',
                'description' => 'Burgundy Active Crew Neck',
                'price'       => 25.50,
                'category'    => CategoryEnum::ACTIVEWEAR->value,
                'colour'      => 'burgundy',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/activewear/burgundy',
            ],

            // Polo
            [
                'name'        => 'Navy Polo',
                'description' => 'Navy Polo',
                'price'       => 40.00,
                'category'    => CategoryEnum::POLO->value,
                'colour'      => 'navy',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/polo/navy',
            ],

            [
                'name'        => 'Military Beige Polo',
                'description' => 'Military Beige Polo',
                'price'       => 35.00,
                'category'    => CategoryEnum::POLO->value,
                'colour'      => 'military-beige',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/polo/military-beige',
            ],

            [
                'name'        => 'White Polo',
                'description' => 'White Polo',
                'price'       => 30.00,
                'category'    => CategoryEnum::POLO->value,
                'colour'      => 'white',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/polo/white',
            ],

            [
                'name'        => 'Burgundy Polo',
                'description' => 'Burgundy Polo',
                'price'       => 30.00,
                'category'    => CategoryEnum::POLO->value,
                'colour'      => 'burgundy',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/polo/burgundy',
            ],

            // V-Neck
            [
                'name'        => 'Black V-Neck T-Shirt',
                'description' => 'Black V-Neck T-Shirt',
                'price'       => 25.00,
                'category'    => CategoryEnum::V_NECK->value,
                'colour'      => 'black',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/v-neck/black',
            ],

            [
                'name'        => 'White V-Neck T-Shirt',
                'description' => 'White V-Neck T-Shirt',
                'price'       => 21.00,
                'category'    => CategoryEnum::V_NECK->value,
                'colour'      => 'white',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/v-neck/white',
            ],

            [
                'name'        => 'Light Gray V-Neck T-Shirt',
                'description' => 'Light Gray V-Neck T-Shirt',
                'price'       => 27.00,
                'category'    => CategoryEnum::V_NECK->value,
                'colour'      => 'light-gray',
                'sizeIds'     => [
                    $sizes['s'],
                    $sizes['l'],
                    $sizes['xl'],
                ],
                'imagesDir' => 'seeder/products/v-neck/light-gray',
            ],
        ];

        foreach ($products as $idx => $product) {
            // skip if specified image directory doesn't exist
            if (! Storage::disk('local')->exists($product['imagesDir'])) {
                echo 'There are no images for this product (or wrong path): '.$product['name'].PHP_EOL;

                continue;
            }

            // skip if specified colour doesn't exist
            if (! $colours[$product['colour']]) {
                echo 'Colour ('.$product['colour'].') does not exists or was not seeded'.PHP_EOL;

                continue;
            }

            try {
                DB::transaction(function () use ($product, $colours, $idx) {
                    $created = Product::create([
                        'name'        => $product['name'],
                        'description' => $product['description'],
                        'price'       => $product['price'],
                        'category'    => $product['category'],
                        'created_at'  => now()->addHours($idx),
                        'updated_at'  => now()->addHours($idx),
                    ]);

                    $created->sizes()->sync($product['sizeIds']);
                    $created->colours()->sync($colours[$product['colour']]);

                    foreach (
                        File::allFiles(storage_path('app/'.$product['imagesDir']))
                        as $idx => $file
                    ) {
                        $fileName = $file->getFilename();
                        $path = 'images/products/'.$created->id.'/';

                        ray(storage_path($path));

                        // copy image over
                        if (! file_exists(storage_path('app/public/'.$path))) {
                            mkdir(storage_path('app/public/'.$path), 0777, true);
                        }

                        File::copy(
                            storage_path('app/'.$product['imagesDir'].'/'.$fileName),
                            storage_path('app/public/'.$path.$fileName)
                        );

                        // save image model
                        $created->images()->create([
                            'url'   => Storage::url($path.$fileName),
                            'order' => $fileName[0],
                        ]);
                    }
                });
            } catch (\Exception $e) {
                echo 'Error saving product: '.$product['name'].'. Exception: '.$e->getMessage().PHP_EOL;
            }
        }

        echo 'Products successfully seeded!';
    }
}
