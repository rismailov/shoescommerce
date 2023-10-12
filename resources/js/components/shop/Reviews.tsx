import { useTranslation } from 'react-i18next'
import { Rating, Star } from '@smastrom/react-rating'

export const Reviews = ({
    reviewsCount,
    avgStars,
}: {
    reviewsCount: number
    avgStars: number
}) => {
    const { t } = useTranslation()

    console.log(Star)

    return (
        <div className="flex items-center space-x-2">
            <Rating
                readOnly
                style={{ maxWidth: 80 }}
                value={avgStars}
                itemStyles={{
                    activeFillColor: '#F87315',
                    inactiveFillColor: '#DEE2E6',
                    itemShapes: Star,
                }}
            />

            {/* <p className="text-muted-foreground text-sm lowercase">
                {`${reviewsCount} ${
                    reviewsCount === 1 ? t('Review') : t('Reviews')
                }`}
            </p> */}
        </div>
    )

    // return (
    //     <Group spacing={5}>
    //         <Rating mb={1.5} readOnly size="xs" fractions={10} value={value} />

    //         <Text size="xs" weight={600}>
    //             {reviewsCount}{' '}
    //             {`${reviewsCount === 1 ? t('Review') : t('Reviews')}`}
    //         </Text>
    //     </Group>
    // )
}
