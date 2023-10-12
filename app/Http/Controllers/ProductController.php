<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetProductsRequest;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\Shop\Products\IndexProductResource;
use App\Http\Resources\Shop\Products\ShowProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * Products page.
     */
    public function index(): \Inertia\Response
    {
        return inertia('shop/products/index', [
            'filterOptions' => fn () => [
                'sizes'   => (new ProductService())->getSizeOptions(),
                'colours' => (new ProductService())->getColourOptions(),
            ],
        ]);
    }

    /**
     * Products JSON data.
     */
    public function data(GetProductsRequest $request): JsonResponse
    {
        $v = fn (string $key) => $request->validated($key);

        $products = Product::with([
            'sizes', 'images', 'colours', 'reviews',
        ])
            ->withCount('reviews')
            ->when($v('genders'), function ($q) use ($v) {
                $q->whereIn('gender', $v('genders'));
            })
            ->when($v('sizes'), function ($q) use ($v) {
                $q->whereHas('sizes', function ($sub) use ($v) {
                    $sub->whereIn('sizes.id', $v('sizes'));
                });
            })
            ->when($v('colours'), function ($q) use ($v) {
                $q->whereHas('colours', function ($sub) use ($v) {
                    $sub->whereIn('colours.id', $v('colours'));
                });
            })
            ->when($v('onSale'), fn ($q) => $q->whereIsDiscounted(true))
            ->when($v('minPrice'), function ($q) use ($v) {
                $q->whereRaw('LEAST(price, COALESCE(discount_price, price)) >= '.$v('minPrice'));
            })
            ->when($v('maxPrice'), function ($q) use ($v) {
                $q->whereRaw('LEAST(price, COALESCE(discount_price, price)) <= '.$v('maxPrice'));
            })
            ->when($v('sort'), function ($q) use ($v) {
                [$key, $value] = explode('-', $v('sort'));

                if ($key === 'date') {
                    $q->orderBy('created_at', $value);
                }

                if ($key === 'price') {
                    $q->orderByRaw("LEAST(price, COALESCE(discount_price, price)) {$value}");
                }
            })
            ->paginate($v('limit'));

        return response()->json(
            IndexProductResource::collection($products)
                ->response()->getData()
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): \Inertia\Response
    {
        // available colours on products from the same category.
        // this is needed for user to select a different colour
        $product->availableColours = Product::with('colours')
            ->select('id', 'nanoid')
            ->where('category', $product->getRawOriginal('category'))
            ->get()
            ->map(function ($product) {
                return [
                    // nanoid needed for slug on client side
                    'nanoid' => $product->nanoid,
                    'colour' => $product->colour,
                ];
            });

        return inertia('shop/products/show', [
            'product' => ShowProductResource::make($product),
            'reviews' => ReviewResource::collection(
                $product->reviews()->latest()->paginate(5)
            ),
        ]);
    }

    /**
     * Store product review.
     */
    public function storeReview(StoreReviewRequest $request, Product $product)
    {
        $product->reviews()->create(
            $request->validated()
        );

        return back()->withSuccess(
            __('responses.crud.saved', [
                'Model' => __('models.reviews.single'),
            ])
        );
    }

    /**
     * Get available sizes for specific product.
     */
    public function getSizes(Product $product) : JsonResponse
    {
        return response()->json(
            $product->sizes->map(function ($size) {
                return [
                    'value' => (string) $size->id,
                    'label' => $size->value,
                ];
            })
        );
    }
}
