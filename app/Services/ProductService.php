<?php

namespace App\Services;

use App\Models\Colour;
use App\Models\Size;

class ProductService
{
    public function getSizeOptions()
    {
        return Size::select(['id', 'value', 'gender'])->get()
            ->map(function ($size) {
                return [
                    // ID's have to be in string format because of the Mantine UI library
                    'value'  => (string) $size['id'],
                    'label'  => $size['value'],
                    'gender' => $size['gender'],
                ];
            });
    }

    public function getColourOptions()
    {
        return Colour::select(['id', 'value', 'hex_code'])->get()
            ->map(function ($colour) {
                return [
                    // ID's have to be in string format because of the Mantine UI library
                    'value' => (string) $colour->id,
                    'label' => __('models.colours.values.'.$colour->value),
                    'hex'   => $colour->hex_code,
                ];
            });
    }

    public static function calculateDiscountPrice(
        string $initial_price,
        string $discount_percent
    ): string {
        $percent_in_float = bcdiv((string) $discount_percent, '100', 2);
        $price_difference = bcmul($initial_price, $percent_in_float);
        $discounted_price = bcsub($initial_price, $price_difference);

        return $discounted_price;
    }
}
