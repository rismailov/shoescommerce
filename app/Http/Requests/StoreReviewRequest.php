<?php

namespace App\Http\Requests;

use App\Rules\AlphaSpaces;
use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title'       => ['required', 'max:100'],
            'text'        => ['required', 'max:500'],
            'credentials' => ['required', new AlphaSpaces],
            'stars'       => ['required', 'in:1,2,3,4,5'],

        ];
    }
}
