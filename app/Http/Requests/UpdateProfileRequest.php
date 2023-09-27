<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(Request $request): array
    {
        return [
            'fname' => ['required', 'string', 'min:2', 'max:30', 'alpha'],
            'lname' => ['required', 'string', 'min:2', 'max:30', 'alpha'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email,'.$request->user()->id,
            ],
        ];
    }
}
