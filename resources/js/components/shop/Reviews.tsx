import { Group, Rating, RatingProps, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const Reviews = ({
    value,
    reviewsCount,
}: RatingProps & { reviewsCount: number }) => {
    const { t } = useTranslation()

    return (
        <Group spacing={5}>
            <Rating mb={1.5} readOnly size="xs" fractions={10} value={value} />

            <Text size="xs" weight={600}>
                {reviewsCount}{' '}
                {`${reviewsCount === 1 ? t('Review') : t('Reviews')}`}
            </Text>
        </Group>
    )
}
