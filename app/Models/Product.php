<?php

namespace App\Models;

use App\Casts\DateCast;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nanoid',
        'gender',
        'name',
        'slug',
        'price',
        'is_discounted',
        'discount_percent',
        'discount_price',
    ];

    protected $casts = [
        'created_at' => DateCast::class,
    ];

    public const MIN_DISCOUNT = 5;

    public const MAX_DISCOUNT = 50;

    protected static function boot()
    {
        parent::boot();

        static::creating(
            function ($product) {
                if (empty($product->nanoid)) {
                    $product->nanoid = bin2hex(random_bytes(10));
                }

                if (
                    empty($product->discount_price) &&
                    $product->is_discounted &&
                    $product->discount_percent
                ) {
                    $ps = new ProductService();

                    $product->discount_price = $ps->calculateDiscountPrice(
                        $product->price,
                        $product->discount_percent
                    );
                }

                if (empty($product->slug)) {
                    $product->slug = str()->slug($product->name);
                }
            }
        );
    }

    /**
     * Get human readable colour name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function colourOptions(): Attribute
    {
        return Attribute::make(
            get: fn () => array_map(fn ($colour) => [
                'value' => (string) $colour->id,
                'label' => __('models.colours.values.'.$colour->value),
                'hex'   => $colour->hex_code,
            ], $this->colours)
        );
    }

    // Relations
    public function colours()
    {
        return $this->belongsToMany(Colour::class);
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class);
    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable')
            ->orderBy('order', 'asc');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
