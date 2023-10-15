import { ProductDescription } from '@/components/shop/products/show/ProductDescription'
import { ProductImages } from '@/components/shop/products/show/ProductImages'
import { TPaginatedData } from '@/types'
import { UserProductShowEntity } from '@/types/entities/product.entity'
import { ReviewEntity } from '@/types/entities/review.entity'
import { usePage } from '@inertiajs/react'

export default function ShowProduct() {
    const { product, reviews } = usePage<{
        product: UserProductShowEntity
        reviews: TPaginatedData<ReviewEntity[]>
    }>().props

    return (
        <div className="container py-8">
            <div className="flex flex-col lg:flex-row items-start space-y-10 lg:space-x-[70px]">
                <ProductImages product={product} />

                <ProductDescription product={product} reviews={reviews} />
            </div>
        </div>
    )
}
