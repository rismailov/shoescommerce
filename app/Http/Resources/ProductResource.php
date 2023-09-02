<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'nanoid'      => $this->nanoid,
            'name'        => $this->name,
            'description' => $this->description,
            'price'       => [
                'initial'    => $this->price,
                'discounted' => $this->discount_price,
            ],
            'category' => [
                'value' => $this->getRawOriginal('category'),
                'label' => $this->category,
            ],
            'colour'  => $this->colour,
            'colours' => $this->when(
                ! $request->routeIs('products.show'),
                $this->colours->map(function ($colour) {
                    return [
                        'value' => (string) $colour->id,
                        'label' => __('models.colours.values.'.$colour->value),
                        'hex'   => $colour->hex_code,
                    ];
                })
            ),
            'availableColours' => $this->when(
                $request->routeIs('products.show'),
                $this->availableColours
            ),
            'reviews' => $this->when(
                $request->routeIs('products.show'),
                ReviewResource::collection($this->reviews)
                    ->response()
                    ->getData(true)
            ),
            'reviewsCount' => $this->when(
                $request->routeIs('products.index'),
                $this->reviews_count
            ),
            'averageStars' => $this->when(
                $request->routeIs('products.index') || $request->routeIs('products.show'),
                $this->reviews->avg('stars'),
            ),
            'sizes' => $this->sizes
                ->map(function ($size) {
                    return [
                        // NOTE: casting as string is needed for mantine checkboxes/selects to work properly
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
            'createdAt' => $this->when(
                $request->routeIs('admin.products.index'),
                $this->created_at,
            ),
            'discountPercent' => $this->when(
                $request->routeIs('admin.products.show'),
                $this->discount_percent ?? Product::MIN_DISCOUNT
            ),
        ];
    }
}
