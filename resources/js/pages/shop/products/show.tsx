// import { CustomerReviews } from '@/components/shop/products/show/CustomerReviews/CustomerReviews'
// import { ProductDescription } from '@/components/shop/products/show/ProductDescription'
// import { ProductImages } from '@/components/shop/products/show/ProductImages'
// import { WriteReviewModal } from '@/components/shop/products/show/WriteReviewModal'
import { TPaginatedData } from '@/types'
import { UserProductShowEntity } from '@/types/entities/product.entity'
import { ReviewEntity } from '@/types/entities/review.entity'
import { usePage } from '@inertiajs/react'
import { Container, Divider, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function ShowProduct() {
    const { product, reviews } = usePage<{
        product: UserProductShowEntity
        reviews: TPaginatedData<ReviewEntity[]>
    }>().props

    const [isReviewModalOpened, { open, close }] = useDisclosure(false)

    return (
        <>
            {/* <WriteReviewModal
                productID={product.id}
                opened={isReviewModalOpened}
                onClose={close}
            /> */}

            <Container pt="xl">
                <Stack gap={50}>
                    <Group wrap="nowrap" align="start" gap={50}>
                        {/* <ProductImages product={product} />

                        <ProductDescription
                            product={product}
                            reviewsCount={reviews.meta.total}
                        /> */}
                    </Group>

                    <Divider />

                    {/* <CustomerReviews reviews={reviews} openReviewModal={open} /> */}
                </Stack>
            </Container>
        </>
    )
}
