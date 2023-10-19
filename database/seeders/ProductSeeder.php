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
                'price'         => 180,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'yellow',
                'imagesDir'     => '/seeder/products/men/air_max_1-86_og/yellow',
            ],
            // KD 16
            [
                'name'          => 'KD 16',
                'price'         => 160,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'red',
                'imagesDir'     => '/seeder/products/men/kd16/red',
            ],
            [
                'name'          => 'KD 16',
                'price'         => 150,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'purple',
                'imagesDir'     => '/seeder/products/men/kd16/purple',
            ],
            // killshot 2 leather
            [
                'name'          => 'Killshot 2 Leather',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'white',
                'imagesDir'     => '/seeder/products/men/killshot_2_leather/white',
            ],
            // Lebron NXXT
            [
                'name'          => 'LeBron NXXT Gen',
                'price'         => 160,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'black',
                'imagesDir'     => '/seeder/products/men/lebron_nxxt_gen/black',
            ],
            [
                'name'             => 'LeBron NXXT Gen',
                'price'            => 160,
                'is_discounted'    => true,
                'discount_percent' => 30,
                'gender'           => GenderEnum::MEN->value,
                'colour'           => 'green',
                'imagesDir'        => '/seeder/products/men/lebron_nxxt_gen/green',
            ],
            [
                'name'          => 'LeBron NXXT Gen',
                'price'         => 170,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'purple',
                'imagesDir'     => '/seeder/products/men/lebron_nxxt_gen/purple',
            ],
            [
                'name'          => 'LeBron NXXT Gen',
                'price'         => 160,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'red',
                'imagesDir'     => '/seeder/products/men/lebron_nxxt_gen/red',
            ],
            // Tech Hera
            [
                'name'             => 'Tech Hera',
                'price'            => 110,
                'is_discounted'    => true,
                'discount_percent' => 20,
                'gender'           => GenderEnum::MEN->value,
                'colour'           => 'brown',
                'imagesDir'        => '/seeder/products/men/tech_hera/brown',
            ],
            [
                'name'          => 'Tech Hera',
                'price'         => 110,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'grey',
                'imagesDir'     => '/seeder/products/men/tech_hera/grey',
            ],
            [
                'name'          => 'Tech Hera',
                'price'         => 110,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'orange',
                'imagesDir'     => '/seeder/products/men/tech_hera/orange',
            ],
            // invincible 3
            [
                'name'          => 'Invincible 3',
                'price'         => 180,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'black',
                'imagesDir'     => '/seeder/products/men/invincible_3/black',
            ],
            [
                'name'             => 'Invincible 3',
                'price'            => 180,
                'is_discounted'    => true,
                'discount_percent' => 15,
                'gender'           => GenderEnum::MEN->value,
                'colour'           => 'red',
                'imagesDir'        => '/seeder/products/men/invincible_3/red',
            ],
            [
                'name'          => 'Invincible 3',
                'price'         => 180,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'blue',
                'imagesDir'     => '/seeder/products/men/invincible_3/blue',
            ],
            // air force 1'07 pro tech
            [
                'name'          => "Air Force 1'07 Pro Tech",
                'price'         => 155,
                'is_discounted' => false,
                'gender'        => GenderEnum::MEN->value,
                'colour'        => 'yellow',
                'imagesDir'     => '/seeder/products/men/air_force_1-07_pro_tech/yellow',
            ],
            /*
             * ============================================================
             * ========================== WOMEN ===========================
             * ============================================================
             */
            // Air Max 90 Futura
            [
                'name'          => 'Air Max 90 Futura',
                'price'         => 150,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'green',
                'imagesDir'     => '/seeder/products/women/air_max_90_futura/green',
            ],
            [
                'name'             => 'Air Max 90 Futura',
                'price'            => 150,
                'is_discounted'    => true,
                'discount_percent' => 30,
                'gender'           => GenderEnum::WOMEN->value,
                'colour'           => 'pink',
                'imagesDir'        => '/seeder/products/women/air_max_90_futura/pink',
            ],
            [
                'name'          => 'Air Max 90 Futura',
                'price'         => 150,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'white',
                'imagesDir'     => '/seeder/products/women/air_max_90_futura/white',
            ],
            // Air VaporMax Plus
            [
                'name'          => 'Air VaporMax Plus',
                'price'         => 210,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'black',
                'imagesDir'     => '/seeder/products/women/air_vapor_max_plus/black',
            ],
            [
                'name'          => 'Air VaporMax Plus',
                'price'         => 210,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'pink',
                'imagesDir'     => '/seeder/products/women/air_vapor_max_plus/pink',
            ],
            [
                'name'          => 'Air VaporMax Plus',
                'price'         => 210,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'red',
                'imagesDir'     => '/seeder/products/women/air_vapor_max_plus/red',
            ],
            // zegama
            [
                'name'          => 'Zegama',
                'price'         => 170,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'pink',
                'imagesDir'     => '/seeder/products/women/zegama/pink',
            ],
            [
                'name'          => 'Zegama',
                'price'         => 170,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'purple',
                'imagesDir'     => '/seeder/products/women/zegama/purple',
            ],
            [
                'name'          => 'Zegama',
                'price'         => 170,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'orange',
                'imagesDir'     => '/seeder/products/women/zegama/orange',
            ],
            // blazer
            [
                'name'          => 'Blazer Low Platform',
                'price'         => 100,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'white',
                'imagesDir'     => '/seeder/products/women/blazer_low_platform/white',
            ],
            // free metcon 5
            [
                'name'          => 'Free Metcon 5',
                'price'         => 120,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'black',
                'imagesDir'     => '/seeder/products/women/free_metcon_5/black',
            ],
            [
                'name'          => 'Free Metcon 5',
                'price'         => 120,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'pink',
                'imagesDir'     => '/seeder/products/women/free_metcon_5/pink',
            ],
            [
                'name'             => 'Free Metcon 5',
                'price'            => 120,
                'is_discounted'    => true,
                'discount_percent' => 30,
                'gender'           => GenderEnum::WOMEN->value,
                'colour'           => 'blue',
                'imagesDir'        => '/seeder/products/women/free_metcon_5/blue',
            ],
            [
                'name'          => 'Free Metcon 5',
                'price'         => 120,
                'is_discounted' => false,
                'gender'        => GenderEnum::WOMEN->value,
                'colour'        => 'yellow',
                'imagesDir'     => '/seeder/products/women/free_metcon_5/yellow',
            ],
            /*
             * ============================================================
             * ========================== KIDS ============================
             * ============================================================
             */
            // Air Force 1
            [
                'name'          => 'Air Force 1',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'black',
                'imagesDir'     => '/seeder/products/kids/air_force_1/black',
            ],
            [
                'name'          => 'Air Force 1',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'pink',
                'imagesDir'     => '/seeder/products/kids/air_force_1/pink',
            ],
            [
                'name'          => 'Air Force 1',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'red',
                'imagesDir'     => '/seeder/products/kids/air_force_1/red',
            ],
            [
                'name'          => 'Air Force 1',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'white',
                'imagesDir'     => '/seeder/products/kids/air_force_1/white',
            ],
            [
                'name'          => 'Air Force 1',
                'price'         => 90,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'yellow',
                'imagesDir'     => '/seeder/products/kids/air_force_1/yellow',
            ],
            // air max 1
            [
                'name'          => 'Air Max 1',
                'price'         => 100,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'green',
                'imagesDir'     => '/seeder/products/kids/air_max_1/green',
            ],
            [
                'name'          => 'Air Max 1',
                'price'         => 100,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'pink',
                'imagesDir'     => '/seeder/products/kids/air_max_1/pink',
            ],
            [
                'name'          => 'Air Max 1',
                'price'         => 100,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'red',
                'imagesDir'     => '/seeder/products/kids/air_max_1/red',
            ],
            [
                'name'          => 'Air Max 1',
                'price'         => 100,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'yellow',
                'imagesDir'     => '/seeder/products/kids/air_max_1/yellow',
            ],
            // air max 270
            [
                'name'          => 'Air Max 270',
                'price'         => 130,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'black',
                'imagesDir'     => '/seeder/products/kids/air_max_270/black',
            ],
            [
                'name'             => 'Air Max 270',
                'price'            => 130,
                'is_discounted'    => true,
                'discount_percent' => 15,
                'gender'           => GenderEnum::KIDS->value,
                'colour'           => 'white',
                'imagesDir'        => '/seeder/products/kids/air_max_270/white',
            ],
            // dunk low
            [
                'name'          => 'Dunk Low',
                'price'         => 70,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'grey',
                'imagesDir'     => '/seeder/products/kids/dunk_low/grey',
            ],
            [
                'name'          => 'Dunk Low',
                'price'         => 70,
                'is_discounted' => false,
                'gender'        => GenderEnum::KIDS->value,
                'colour'        => 'pink',
                'imagesDir'     => '/seeder/products/kids/dunk_low/pink',
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
                        'price'            => $product['price'],
                        'gender'           => $product['gender'],
                        'is_discounted'    => $product['is_discounted'],
                        'created_at'       => $date,
                        'updated_at'       => $date,
                        'discount_percent' => array_key_exists('discount_percent', $product)
                            ? $product['discount_percent']
                            : null,
                    ]);

                    // attach sizes (pick 3 to 5 random sizes from the same gender)
                    $sizes = Size::select(['id', 'value', 'gender'])
                        ->whereGender($created->gender)
                        ->inRandomOrder()
                        ->limit(rand(3, 5))
                        ->pluck('id')
                        ->toArray();

                    $created->sizes()->sync($sizes);

                    // attach colours
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

        echo PHP_EOL.'Products successfully seeded!'.PHP_EOL;
    }
}
