<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetProductsRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Products page.
     */
    public function index(): \Inertia\Response
    {
        return inertia('shop/products/index');
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
            ->when($v('categories'), function ($q) use ($v) {
                $q->whereIn('category', $v('categories'));
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
                $key = $key === 'date' ? 'created_at' : 'price';

                $q->orderBy($key, $value);
            })
            ->paginate($v('limit'));

        return response()->json(
            ProductResource::collection($products)
                ->response()->getData()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
