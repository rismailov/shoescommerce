<?php

namespace App\Http\Resources;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'title' => $this->title,
            'text'  => [
                'excerpt' => Str::limit($this->text, Review::REVIEW_TEXT_EXCERPT),
                'full'    => $this->text,
            ],
            'credentials' => $this->credentials,
            'stars'       => $this->stars,
        ];
    }
}
