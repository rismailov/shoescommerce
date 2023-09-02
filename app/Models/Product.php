<?php

namespace App\Models;

use App\Casts\DateCast;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nanoid',
        'category',
        'name',
        'description',
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
            }
        );
    }

    /**
     * Get human readable category name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function category(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => __('models.categories.'.$value)
        );
    }

    /**
     * Get human readable colour name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function colour(): Attribute
    {
        return Attribute::make(
            get: fn () => [
                'value' => (string) $this->colours->first()->id,
                'label' => __('models.colours.values.'.$this->colours->first()->value),
                'hex'   => $this->colours->first()->hex_code,
            ]
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
