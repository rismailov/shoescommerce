<?php

namespace App\Http\Requests;

use App\Enums\CategoryEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class GetProductsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'categories'   => ['array'],
            'categories.*' => [new Enum(CategoryEnum::class)],
            'sizes'        => ['array'],
            'sizes.*'      => ['numeric'],
            'colours'      => ['array'],
            'colours.*'    => ['numeric'],
            'onSale'       => ['boolean'],
            'minPrice'     => ['numeric', 'min:0.00'],
            'maxPrice'     => ['numeric'],
            'limit'        => ['numeric', 'min:1', 'nullable'],
            'sort'         => [
                'nullable',
                'in:price-asc,price-desc,date-asc,date-desc',
            ],
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    public function prepareForValidation()
    {
        if (! $this->price) {
            return;
        }

        $merged = [
            'onSale' => filter_var($this->price['onSale'], FILTER_VALIDATE_BOOL),
        ];

        if (isset($this->price['min'])) {
            $merged['minPrice'] = $this->price['min'];
        }

        if (isset($this->price['max'])) {
            $merged['maxPrice'] = $this->price['max'];
        }

        $this->merge($merged);
    }
}
