<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductReviewController;
use Illuminate\Support\Facades\Route;

Route::get('locale/{locale}', function ($locale) {
    session()->put('locale', $locale);
})->where('locale', 'en|ru')->name('change_locale');

Route::inertia('/', 'shop/homepage')->name('homepage');

// shop
Route::group([
    'prefix' => '/shop',
    'as'     => 'products.',
], function () {
    Route::get('/', [ProductController::class,  'index'])->name('index');
    Route::get('/data', [ProductController::class,  'data'])->name('data');
    Route::get('/{product:nanoid}', [ProductController::class,  'show'])->name('show');
    Route::get('/{product}/sizes', [ProductController::class,  'getSizes'])->name('get_sizes');
    Route::post('/{product}/reviews', [ProductController::class, 'storeReview'])
        ->name('reviews.store');
});

require __DIR__.'/auth.php';
