import {
    Box,
    Button,
    Container,
    Group,
    Image,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useStyles } from './Hero.styles'
import { AbstractLines } from './sprites/AbstractLines'
import { AirMaxTitle } from './sprites/AirMaxTitle'

export const Hero = () => {
    const { t } = useTranslation()
    const { classes } = useStyles()

    return (
        <Box pt="xl">
            <Container>
                <Group className={classes.wrapper}>
                    <AbstractLines />

                    <Stack>
                        <AirMaxTitle />

                        <Stack spacing="xs">
                            <Title order={2} color="white" lh={1}>
                                AIR MAX 90 'ANTHRACITE
                            </Title>

                            <Text fz="lg" color="white">
                                $189.99
                            </Text>

                            <Text
                                fz="lg"
                                maw={500}
                                sx={(theme) => ({
                                    color: theme.colors.dark[3],
                                })}
                            >
                                Nothing as fly, nothing as comfortable, nothing
                                as proven. The Nike Air Max 90 stays true to its
                                roots with the iconic Waffle sole, stitched
                                overlays and classic TPU accents.
                            </Text>

                            <Button
                                mt="sm"
                                size="md"
                                sx={(theme) => ({
                                    alignSelf: 'start',
                                    background: theme.colors.gray[2],
                                    color: theme.colors.dark[9],
                                    ':hover': {
                                        background: theme.colors.gray[4],
                                    },
                                })}
                            >
                                {t('Shop Now')}
                            </Button>
                        </Stack>
                    </Stack>

                    <Image
                        src="/images/hero-shoes.png"
                        alt="Hero image"
                        width={450}
                        style={{
                            transform: 'rotate(10deg)',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </Group>
            </Container>
        </Box>
    )
}
