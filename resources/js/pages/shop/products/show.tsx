import { ProductDescription } from '@/components/shop/products/show/ProductDescription'
import { ProductImages } from '@/components/shop/products/show/ProductImages'
import { TPaginatedData } from '@/types'
import { ProductShowEntity } from '@/types/entities/product.entity'
import { ReviewEntity } from '@/types/entities/review.entity'
import { Head, usePage } from '@inertiajs/react'
import 'swiper/css'

export default function ShowProduct() {
    const { product, reviews } = usePage<{
        product: ProductShowEntity
        reviews: TPaginatedData<ReviewEntity[]>
    }>().props

    return (
        <div className="container py-8">
            <Head title={`Nike ${product.name}`} />

            <div className="flex flex-col lg:flex-row items-start lg:space-x-[50px]">
                <ProductImages product={product} />

                <ProductDescription product={product} reviews={reviews} />
            </div>
        </div>
    )
}
