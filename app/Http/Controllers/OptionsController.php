<?php

namespace App\Http\Controllers;

use App\Services\ProductService;

class OptionsController extends Controller
{
    public function productPropertyOptions()
    {
        return response()->json(
            [
                'size'   => (new ProductService())->getSizeOptions(),
                'colour' => (new ProductService())->getColourOptions(),
            ]
        );
    }
}
