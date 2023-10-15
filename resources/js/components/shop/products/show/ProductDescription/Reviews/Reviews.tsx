import { Pagination } from '@/components/common/Pagination'
import { Rating } from '@/components/common/Rating'
import { TPaginatedData } from '@/types'
import { ReviewEntity } from '@/types/entities/review.entity'
import { router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Review } from './Review'

export const Reviews = ({
    avgStars,
    reviews,
}: {
    avgStars: number
    reviews: TPaginatedData<ReviewEntity[]>
}) => {
    const { t } = useTranslation()

    const onPageChange = (page: number) => {
        router.reload({
            only: ['reviews'],
            data: { page },
        })
    }

    return (
        <div className="flex flex-col space-y-10">
            {/* Review stars and average stars count */}
            <div className="flex items-center space-x-2">
                <Rating readOnly style={{ maxWidth: 100 }} value={avgStars} />

                <p className="leading-none text-muted-foreground">{`${avgStars
                    .toString()
                    .replace('.', ',')} ${t('stars')}`}</p>
            </div>

            {/* Reviews themselves */}
            <div className="flex flex-col space-y-8">
                {reviews.data.map((review) => (
                    <Review key={review.id} {...review} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                page={reviews.meta.current_page}
                total={reviews.meta.last_page}
                onPageChange={onPageChange}
            />
        </div>
    )
}
