<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * Edit profile data.
     */
    public function profileEdit(): \Inertia\Response
    {
        return inertia('shop/settings/profile', [
            'profileData' => [
                'fname' => auth()->user()->fname,
                'lname' => auth()->user()->lname,
                'email' => auth()->user()->email,
            ],
        ]);
    }

    /**
     * Update profile data.
     */
    public function profileUpdate(UpdateProfileRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        $request->user()->save();

        return back()->withSuccess(
            __('responses.crud.updated', [
                'Model' => __('models.user.profile'),
            ])
        );
    }

    public function accountEdit(): \Inertia\Response
    {
        return inertia('shop/settings/account');
    }
}
