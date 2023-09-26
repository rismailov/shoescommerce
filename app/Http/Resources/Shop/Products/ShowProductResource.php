<?php

namespace App\Http\Resources\Shop\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'nanoid'           => $this->nanoid,
            'name'             => $this->name,
            'description'      => $this->description,
            'colour'           => $this->colour,
            'avgStars'         => $this->reviews->avg('stars'),
            'availableColours' => $this->availableColours,
            'price'            => [
                'initial'    => $this->price,
                'discounted' => $this->discount_price,
            ],
            'category' => [
                'value' => $this->getRawOriginal('category'),
                'label' => $this->category,
            ],
            'availableSizes' => $this->sizes
                ->map(function ($size) {
                    return [
                        'value' => (string) $size->id,
                        'label' => $size->value,
                    ];
                }),
            'images' => $this->images->map(function ($img) {
                return [
                    'id'  => $img->id,
                    'url' => $img->url,
                ];
            }),
        ];
    }
}
