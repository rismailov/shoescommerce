import { ReviewEntity } from '@/types/entities/review.entity'
import {
    Card,
    Center,
    Group,
    Rating,
    Stack,
    Text,
    UnstyledButton,
} from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { useStyles } from './Review.styles'

export const Review = (review: ReviewEntity) => {
    const [showFullText, setShowFullText] = useState(false)
    const { classes } = useStyles()

    return (
        <Card p="xl" className={classes.reviewCard}>
            <Group align="start" spacing="xl" className="review-card">
                {/* client */}
                <Group className="review-card__client-data" noWrap>
                    <Center className={classes.userAvatar}>
                        <IconUser />
                    </Center>

                    <Stack spacing={0}>
                        <Text weight={600} fz={16}>
                            {review.credentials}
                        </Text>
                        <Text color="dimmed" fz={14}>
                            Verified Buyer
                        </Text>
                    </Stack>
                </Group>

                {/* review */}
                <Stack
                    className="review-card__review"
                    spacing={5}
                    sx={{ flex: 1 }}
                >
                    <Group spacing="xs">
                        <Rating readOnly value={review.stars} />

                        <Text size="md" weight={600}>
                            {review.title}
                        </Text>
                    </Group>

                    <Stack spacing="xs">
                        <Text fz={16} sx={{ wordBreak: 'break-all' }}>
                            {showFullText
                                ? review.text.full
                                : review.text.excerpt}
                        </Text>

                        {review.text.excerpt !== review.text.full &&
                            !showFullText && (
                                <UnstyledButton
                                    onClick={() => setShowFullText(true)}
                                    className={classes.readTheRestButton}
                                >
                                    Read the rest
                                </UnstyledButton>
                            )}
                    </Stack>
                </Stack>
            </Group>
        </Card>
    )
}
