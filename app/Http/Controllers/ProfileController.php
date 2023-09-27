<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(): Response
    {
        return inertia('shop/profile/edit', [
            'profileData' => [
                'fname' => auth()->user()->fname,
                'lname' => auth()->user()->lname,
                'email' => auth()->user()->email,
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        $request->user()->save();

        return back()->withSuccess(
            __('responses.crud.updated', [
                'Model' => __('models.user.profile'),
            ])
        );
    }
}
