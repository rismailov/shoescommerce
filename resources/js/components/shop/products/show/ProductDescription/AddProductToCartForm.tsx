import { Button } from '@/components/ui/button'
import useCartStore from '@/lib/store/cart.store'
import { UserProductShowEntity } from '@/types/entities/product.entity'
import { Link } from '@inertiajs/react'
import { IconHeart } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AddProductToCartForm = ({
    product,
}: {
    product: UserProductShowEntity
}) => {
    const { t } = useTranslation()

    const items = useCartStore((state) => state.items)
    const addItem = useCartStore((state) => state.addItem)
    const toggleCart = useCartStore((state) => state.toggleIsCartOpened)

    const [selectedSize, setSelectedSize] = useState(product.availableSizes[0])

    const onAddItem = () => {
        addItem({
            id: `${product.id}-${selectedSize.value}`,
            imageUrl: product.images[0].url,
            name: product.name,
            size: selectedSize,
            price: product.price.discounted ?? product.price.initial,
            amount: 1,
        })

        toggleCart()
    }

    return (
        <div className="flex flex-col space-y-8">
            {/* choose size */}
            <div className="flex flex-col space-y-3">
                <p className="font-medium">
                    {`${t('Size')}: ${selectedSize.label}`}
                </p>

                <div className="grid grid-cols-6 gap-2">
                    {product.availableSizes.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setSelectedSize({ value, label })}
                            className={clsx([
                                'p-2 border-[1.5px] rounded-md',
                                selectedSize.value === value &&
                                    'border-accent-foreground',
                            ])}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* choose colour */}
            <div className="flex flex-col space-y-3">
                <p className="font-medium">
                    {`${t('Colour')}: ${product.colour}`}
                </p>

                <div className="w-full grid grid-flow-col auto-cols-max gap-1">
                    {product.availableColours.map(({ nanoid, image }) => (
                        <Link
                            key={nanoid}
                            href={route('products.show', { nanoid })}
                            preserveScroll
                        >
                            <img
                                src={image}
                                className={clsx([
                                    'w-[80px] h-[80px] overflow-hidden rounded-lg border-[1.5px] object-center object-cover',
                                    nanoid === product.nanoid
                                        ? 'border-accent-foreground'
                                        : 'border-transparent',
                                ])}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* add to cart */}
            <div className="pt-1 flex items-center space-x-3">
                <Button
                    onClick={onAddItem}
                    variant="accent"
                    size="lg"
                    className="w-full rounded-full h-12 font-medium"
                >
                    {t('Add to Cart')}
                </Button>

                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full rounded-full h-12 font-medium border bg-white"
                >
                    <span>{t('Favorite')}</span>
                    <IconHeart className="sprite sprite-md ml-3" />
                </Button>
            </div>
        </div>
    )
}
