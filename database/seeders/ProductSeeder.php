<?php

namespace Database\Seeders;

use App\Enums\GenderEnum;
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

        // let's hardcode some products!
        $products = [
            /*
             * ============================================================
             * ========================== MEN =============================
             * ============================================================
             */
            // AIR MAX 1'86 OG G
            [
                'name'          => "Air Max 1'86 OG G",
                'description'   => "Air Max 1'86 OG G",
                'price'         => 180,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'yellow',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/air_max_1-86_og/yellow',
            ],
            // KD 16
            [
                'name'          => 'KD 16',
                'description'   => 'KD 16',
                'price'         => 160,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'red',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/kd16/red',
            ],
            [
                'name'          => 'KD 16',
                'description'   => 'KD 16',
                'price'         => 150,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'purple',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/kd16/purple',
            ],
            // killshot 2 leather
            [
                'name'          => 'Killshot 2 Leather',
                'description'   => 'Killshot 2 Leather',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'white',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/killshot_2_leather/white',
            ],
            // Lebron NXXT
            [
                'name'          => 'LeBron NXXT Gen',
                'description'   => 'LeBron NXXT Gen',
                'price'         => 160,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'black',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/lebron_nxxt_gen/black',
            ],
            [
                'name'             => 'LeBron NXXT Gen',
                'description'      => 'LeBron NXXT Gen',
                'price'            => 160,
                'is_discounted'    => true,
                'discount_percent' => 30,
                'gender'           => GenderEnum::MEN->value,
                'colour'           => 'green',
                'sizes'            => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/lebron_nxxt_gen/green',
            ],
            [
                'name'          => 'LeBron NXXT Gen',
                'description'   => 'LeBron NXXT Gen',
                'price'         => 170,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'purple',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/lebron_nxxt_gen/purple',
            ],
            [
                'name'          => 'LeBron NXXT Gen',
                'description'   => 'LeBron NXXT Gen',
                'price'         => 160,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'red',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/lebron_nxxt_gen/red',
            ],
            // Tech Hera
            [
                'name'             => 'Tech Hera',
                'description'      => 'Tech Hera',
                'price'            => 110,
                'is_discounted'    => true,
                'discount_percent' => 20,
                'gender'           => GenderEnum::MEN->value,
                'colour'           => 'brown',
                'sizes'            => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/tech_hera/brown',
            ],
            [
                'name'          => 'Tech Hera',
                'description'   => 'Tech Hera',
                'price'         => 110,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'grey',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/tech_hera/grey',
            ],
            [
                'name'          => 'Tech Hera',
                'description'   => 'Tech Hera',
                'price'         => 110,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'orange',
                'sizes'         => [
                    $sizes['s'],
                    $sizes['m'],
                    $sizes['xl'],
                    $sizes['xxl'],
                ],
                'imagesDir' => '/seeder/products/men/tech_hera/orange',
            ],
        ];

        foreach ($products as $product) {
            // skip if specified image directory doesn't exist
            if (! Storage::disk('local')->exists($product['imagesDir'])) {
                echo 'There are no images for this product (or wrong path): '.$product['name'].PHP_EOL;

                continue;
            }

            // skip if specified colour doesn't exist (wasn't seeded)
            if (! $colours[$product['colour']]) {
                echo 'Colour ('.$product['colour'].') was not seeded'.PHP_EOL;

                continue;
            }

            try {
                DB::transaction(function () use ($product, $colours) {
                    $date = fake()->dateTimeBetween('-5 days', 'now');
                    $created = Product::create([
                        'name'             => $product['name'],
                        'description'      => $product['description'],
                        'price'            => $product['price'],
                        'gender'           => $product['gender'],
                        'is_discounted'    => $product['is_discounted'],
                        'created_at'       => $date,
                        'updated_at'       => $date,
                        'discount_percent' => array_key_exists('discount_percent', $product)
                            ? $product['discount_percent']
                            : null,
                    ]);

                    $created->sizes()->sync($product['sizes']);
                    $created->colours()->sync($colours[$product['colour']]);

                    /**
                     * Save images.
                     *
                     * NOTE: because we're seeding images, we will manually copy them over
                     * to storage's public directory.
                     */
                    $path = 'images/products/'.$created->id.'/';
                    $images_dir_to = storage_path('app/public/'.$path); // destination dir

                    if (! file_exists($images_dir_to)) {
                        // if directory doesn't exist create it
                        mkdir($images_dir_to, 0777, true);
                    } else {
                        // and if it does, delete all images from previous seed so they don't get mixed up
                        foreach (glob($images_dir_to.'*') as $file) {
                            is_file($file) && unlink($file);
                        }
                    }

                    // copy files and save them to DB
                    $images_dir_from = storage_path('app/'.$product['imagesDir'].'/'); // from dir
                    foreach (File::allFiles($images_dir_from) as $file) {
                        $fileName = $file->getFilename();

                        // copy image over
                        File::copy(
                            $images_dir_from.$fileName,
                            $images_dir_to.$fileName
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
