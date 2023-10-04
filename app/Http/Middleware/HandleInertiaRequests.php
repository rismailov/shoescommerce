<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $payload = [
            ...parent::share($request),
            'appName' => fn () => config('app.name'),
            'locale'  => fn () => $request->session()->get('locale', 'en'),
            'flash'   => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
            'user' => $request->user()
                ? UserResource::make($request->user())
                : null,
        ];

        /*
         * Product categories needed for links in Header which is only used
         * in shop routes, e.g. all routes except admin. Here we're checking
         * if route name has 'admin' in it, and if not, adding categories to payload.
         */
        if (! str()->contains($request->route()->getName(), 'admin')) {
            $payload['categories'] = (new ProductService)->getCategoryOptions();
        }

        return $payload;
    }
}
