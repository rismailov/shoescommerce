import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TPaginatedData } from '@/types'
import { ProductShowEntity } from '@/types/entities/product.entity'
import { ReviewEntity } from '@/types/entities/review.entity'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AddProductToCartForm } from './AddProductToCartForm'
import { Reviews } from './Reviews'
import { WriteReviewModal } from './Reviews/WriteReviewModal'

export const ProductDescription = ({
    product,
    reviews,
}: {
    product: ProductShowEntity
    reviews: TPaginatedData<ReviewEntity[]>
}) => {
    const { t } = useTranslation()

    const [isReviewModalOpened, setReviewModalOpened] = useState(false)

    return (
        <section className="flex-1 flex flex-col space-y-8 lg:pb-10">
            {/* NAME AND GENDER */}
            <div className="md:max-w-lg flex flex-col space-y-3">
                <h1 className="text-3xl font-bold tracking-tight leading-none">
                    {`Nike ${product.name}`}
                </h1>

                <p className="text-muted-foreground text-lg leading-none">{`${t(
                    // @ts-ignore
                    `${product.gender}'s`,
                )} ${t('Shoes')}`}</p>
            </div>

            <Swiper className="lg:hidden">
                {product.images.map((img, idx) => (
                    <SwiperSlide
                        key={`mobile_slide_${idx}`}
                        className="!w-full"
                    >
                        <img
                            src={img.url}
                            alt={product.name}
                            className="w-full h-full object-center object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* note: the wrapper below is only needed to set max width */}
            <div className="md:max-w-lg flex flex-col space-y-8">
                {/* PRICE */}
                <h1 className="text-2xl font-medium tracking-tight leading-none">
                    <div className="flex items-center space-x-3">
                        <span
                            className={clsx(
                                !!product.price.discounted &&
                                    'line-through text-muted-foreground',
                            )}
                        >
                            ${product.price.initial}
                        </span>

                        {product.price.discounted && (
                            <span>${product.price.discounted}</span>
                        )}
                    </div>
                </h1>

                {/* ADD PRODUCT TO CART */}
                <AddProductToCartForm product={product} />

                <Separator />

                {/* SHIPPING & RETURNS */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-semibold">
                        {t('Shipping & Returns')}
                    </h3>

                    <p>
                        {t(
                            'Free standard shipping on orders $50+ and free 60-day returns for Nike Members.',
                        )}
                    </p>
                </div>

                <Separator />

                {/* REVIEWS */}
                <div className="flex flex-col space-y-3">
                    <div className="w-full flex items-center justify-between pr-3">
                        <span className="text-lg font-semibold">
                            {t('Reviews')} ({reviews.meta.total})
                        </span>

                        <Button
                            onClick={() => setReviewModalOpened(true)}
                            variant="link"
                            className="self-start"
                        >
                            {t('Write a Review')}
                        </Button>

                        <WriteReviewModal
                            open={isReviewModalOpened}
                            setOpen={setReviewModalOpened}
                            productID={product.id}
                        />
                    </div>

                    <Reviews avgStars={product.avgStars} reviews={reviews} />
                </div>
            </div>
        </section>
    )
}
