import { ProductIndexEntity } from '@/types/entities/product.entity'
import { Link } from '@inertiajs/react'
import { useMediaQuery } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { screens } from 'tailwindcss/defaultTheme'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const MotionImg = motion(LazyLoadImage)

export const ProductCard = ({
    product,
    showFilters,
}: {
    product: ProductIndexEntity
    showFilters: boolean
}) => {
    const minWidthLG = useMediaQuery(`(min-width: ${screens.lg})`)

    return (
        <Link
            href={route('products.show', { product: product.nanoid })}
            className="w-full inline-flex flex-col"
        >
            {/* Image */}
            <MotionImg
                layout
                src={product.imgUrl}
                alt={product.name}
                className="w-full rounded-xl object-center object-cover"
                effect="blur"
                style={{
                    height: minWidthLG && !showFilters ? 450 : 350,
                }}
            />

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
