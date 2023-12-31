<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Shop\SettingsController;
use Illuminate\Support\Facades\Route;

Route::get('locale/{locale}', function ($locale) {
    session()->put('locale', $locale);
})->where('locale', 'en|ru')->name('change_locale');

Route::inertia('/', 'shop/homepage')->name('homepage');

// shop
Route::prefix('/shop')->as('products.')->group(function () {
    Route::get('/', [ProductController::class,  'index'])->name('index');
    Route::get('/data', [ProductController::class,  'data'])->name('data');
    Route::get('/{product:nanoid}', [ProductController::class,  'show'])->name('show');
    Route::get('/{product}/sizes', [ProductController::class,  'getSizes'])->name('get_sizes');
    Route::post('/{product}/reviews', [ProductController::class, 'storeReview'])
        ->name('reviews.store');
});

Route::inertia('/checkout', 'shop/checkout')->name('checkout');

// profile
Route::middleware('auth')->prefix('/settings')->as('settings.')->group(function () {
    Route::get('/profile', [SettingsController::class, 'profileEdit'])
        ->name('profile.edit');
    Route::patch('/profile', [SettingsController::class, 'profileUpdate'])
        ->name('profile.update');
    Route::get('/account', [SettingsController::class, 'accountEdit'])
        ->name('account.edit');
});

require __DIR__.'/auth.php';
