import { Link } from '@inertiajs/react'
import { Box, Button, Container, Image, Stack, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const Hero = () => {
    const { t } = useTranslation()

    return (
        <Box
            pos="relative"
            sx={(theme) => ({ background: theme.colors.gray[1] })}
        >
            <Container>
                {/* CTA */}
                <Stack w="50%" py="xl" justify="center" spacing={0} mih="60vh">
                    <Title fz={50}>{t("Gifts he'll feel good in")}</Title>

                    <Title fz={25} weight={400} opacity={0.8}>
                        {t('Confidence looks good on you.')}
                    </Title>

                    <Button
                        component={Link}
                        href={route('products.index')}
                        mt="xl"
                        size="lg"
                        sx={{ alignSelf: 'start' }}
                        fw={600}
                    >
                        {t('Shop now')}
                    </Button>
                </Stack>

                {/* Image */}
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '50%',
                    }}
                >
                    <Image
                        src="/images/hero-image.webp"
                        alt="Hero image"
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                        styles={{
                            root: {
                                height: '100%',
                            },
                            imageWrapper: {
                                height: '100%',
                            },
                            figure: {
                                height: '100%',
                            },
                            image: {
                                height: '100% !important',
                            },
                        }}
                    />
                </Box>
            </Container>
        </Box>
    )
}
