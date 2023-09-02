<?php

namespace App\Services;

use App\Enums\CategoryEnum;
use App\Models\Colour;
use App\Models\Size;

class ProductService
{
    public function getCategoryOptions()
    {
        return array_map(function ($cat) {
            return [
                'value' => $cat,
                'label' => __('models.categories.'.$cat),
            ];
        }, array_column(CategoryEnum::cases(), 'value'));
    }

    public function getSizeOptions()
    {
        return Size::select('id', 'value')->get()
            ->map(function ($size) {
                return [
                    // ID's have to be in string format because of the Mantine UI library
                    'value' => (string) $size['id'],
                    'label' => $size['value'],
                ];
            }, Size::select('id', 'value')->get()->toArray());
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
}
