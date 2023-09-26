import { TPaginatedData } from '@/types'
import { ReviewEntity } from '@/types/entities/review.entity'
import { router } from '@inertiajs/react'
import { Button, Pagination, Stack, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { Review } from './Review'

export const CustomerReviews = ({
    reviews,
    openReviewModal,
}: {
    reviews: TPaginatedData<ReviewEntity[]>
    openReviewModal: () => void
}) => {
    const { t } = useTranslation()

    const onPageChange = (page: number) => {
        router.reload({
            only: ['reviews'],
            data: { page },
        })
    }

    return (
        <Stack align="center" spacing="xl" pb={80}>
            <Stack spacing={5} align="center" justify="center" mb="sm">
                <Title order={2}>{t('Customer Reviews')}</Title>

                <Button
                    onClick={openReviewModal}
                    mt="sm"
                    size="md"
                    color="dark"
                    radius="xl"
                >
                    {t('Write a review')}
                </Button>
            </Stack>

            <Stack>
                {!reviews.meta.total ? (
                    <Text size="lg" color="dimmed">
                        {t(
                            'No reviews for this product yet. Be the first one to write it!',
                        )}
                    </Text>
                ) : (
                    <>
                        {reviews.data.map((review) => (
                            <Review key={review.id} {...review} />
                        ))}

                        <Pagination
                            mt="md"
                            sx={{ alignSelf: 'center' }}
                            color="dark"
                            value={reviews.meta.current_page}
                            onChange={onPageChange}
                            total={reviews.meta.last_page}
                        />
                    </>
                )}
            </Stack>
        </Stack>
    )
}
