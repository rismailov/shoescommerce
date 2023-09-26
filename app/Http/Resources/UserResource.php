<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'fullName' => [
                'full'     => $this->fname.' '.$this->lname,
                'initials' => $this->fname[0].$this->lname[0],
            ],
            'email' => [
                'full'    => $this->email,
                'excerpt' => Str::limit($this->email, 20),
            ],
        ];
    }
}
