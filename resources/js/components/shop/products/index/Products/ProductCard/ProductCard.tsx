import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { Link } from '@inertiajs/react'
import { useMediaQuery } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { screens } from 'tailwindcss/defaultTheme'

export const ProductCard = ({
    product,
    showFilters,
}: {
    product: UserProductIndexEntity
    showFilters: boolean
}) => {
    // This is needed to delay animation. Can be safely removed.
    // @note: to understand the purpose of this delay, add product to Cart from "Quick add" button,
    // and then quickly remove the mouse from the product card
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const minWidthLG = useMediaQuery(`(min-width: ${screens.lg})`)

    return (
        <Link
            href={route('products.show', { product: product.nanoid })}
            className="w-full inline-flex flex-col"
        >
            {/* Image */}
            <motion.img
                layout
                src={product.img.url}
                alt={product.name}
                className="w-full rounded-xl object-center object-cover"
                style={{
                    height: minWidthLG && !showFilters ? 450 : 350,
                }}
            />

            {/* <div className="relative w-full h-full max-h-[300px] overflow-hidden rounded-lg">
                <QuickAdd
                    product={product}
                    isLoading={isAddingToCart}
                    setIsLoading={setIsAddingToCart}


                    QUICK ADD STYLES::::
                        ['div[data-quick-add-wrapper]']: {
                            opacity: 0,
                            transform: 'translateY(5px)',
                            transition: `opacity 0.2s ${transition} ${
                                isAddingToCart ? '1.5s' : '0s'
                            }, transform 0.1s ${transition} ${
                                isAddingToCart ? '1.5s' : '0s'
                            }`,
                        },

                        ':hover': {
                            ['div[data-quick-add-wrapper]']: {
                                opacity: 1,
                                transform: 'translateY(0)',
                                transition: 'none',
                            },
                        },
                    QUICK ADD STYLES::::

                />
            </div> */}

            {/* Description */}
            <motion.div
                layout="position"
                className="flex flex-col items-start space-y-1.5 py-3"
            >
                {/* name */}
                <p className="text-lg font-medium leading-tight">{`Nike ${product.name}`}</p>

                {/* gender, colours count */}
                <p className="text-muted-foreground leading-tight">
                    {product.gender}
                </p>

                <p className="text-muted-foreground leading-tight">5 Colours</p>

                {/* price */}
                <div className="flex items-center space-x-2">
                    <p
                        className={clsx([
                            'text-lg font-medium leading-tight',
                            product.price.discounted &&
                                'line-through text-muted-foreground',
                        ])}
                    >
                        ${product.price.initial}
                    </p>

                    {product.price.discounted && (
                        <p className="text-lg font-medium leading-tight">
                            ${product.price.discounted}
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    )
}
