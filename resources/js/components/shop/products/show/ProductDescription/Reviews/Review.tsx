import { Rating } from '@/components/common/Rating'
import { Button } from '@/components/ui/button'
import { ReviewEntity } from '@/types/entities/review.entity'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Review = (review: ReviewEntity) => {
    const { t } = useTranslation()

    const [showFullText, setShowFullText] = useState(false)

    const { excerpt, full } = review.text

    return (
        <div className="flex flex-col space-y-2">
            <h3 className="font-medium">{review.title}</h3>

            <div className="flex items-center space-x-3">
                <Rating
                    readOnly
                    value={review.stars}
                    style={{ maxWidth: 100 }}
                    isPrimaryColor={false}
                />

                <p className="text-muted-foreground">{`${review.credentials} - ${review.date}`}</p>
            </div>

            <p>
                {showFullText ? full : excerpt}

                {excerpt.length !== full.length && !showFullText && (
                    <Button
                        onClick={() => setShowFullText(true)}
                        variant="link"
                        className="inline h-auto self-start p-0 ml-2 underline"
                    >
                        {t('More')}
                    </Button>
                )}
            </p>
        </div>
    )
}
