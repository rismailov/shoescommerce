<?php

namespace App\Http\Resources\Shop\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($this->id === 9) {
            ray($this->images->pluck('url'));
        }

        return [
            'id'           => $this->id,
            'nanoid'       => $this->nanoid,
            'name'         => $this->name,
            'description'  => $this->description,
            'reviewsCount' => $this->reviews_count,
            'avgStars'     => $this->reviews->avg('stars'),
            'imgUrl'          => $this->images->where('order', 0)->first()->url,
            'price'        => [
                'initial'    => $this->price,
                'discounted' => $this->discount_price,
            ],
            'gender' => __('models.genders.product_subtitle', [
                'Gender' => __('models.genders.'.$this->gender),
            ]),
        ];
    }
}
