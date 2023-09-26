import { Link, usePage } from '@inertiajs/react'
import { Box, Divider, Stack, Text, Title } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import AppLayout from './AppLayout'
import { useStyles } from './AuthLayout.styles'

export default function AuthLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation()
    const { url } = usePage()
    const { classes } = useStyles()

    return (
        <AppLayout>
            <Stack align="center" spacing={5} pt={150} pb={40}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={url}
                        className={classes.descriptionText}
                        initial={{ y: 3, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        exit={{
                            y: -3,
                            opacity: 0,
                            transition: { duration: 0.1 },
                        }}
                        transition={{
                            type: 'tween',
                            ease: 'easeIn',
                        }}
                    >
                        {url.includes('login')
                            ? t('Login to enjoy full services.')
                            : t(
                                  'Join us to get our newsletters, discounts and more!',
                              )}
                    </motion.span>
                </AnimatePresence>

                <Divider
                    size={0.5}
                    mt="md"
                    sx={{ width: '100%', maxWidth: '50vw' }}
                />

                <Stack p="md" pos="relative" sx={{ borderRadius: 5 }} miw={400}>
                    <Stack align="center" spacing={5}>
                        <Title>
                            {url.includes('login') ? t('Login') : t('Register')}
                        </Title>

                        <Text size="lg">
                            {t('or') + ' '}
                            <Text
                                inherit
                                component={Link}
                                href={route(
                                    `auth.${
                                        url.includes('login')
                                            ? 'register'
                                            : 'login'
                                    }.create`,
                                )}
                                variant="gradient"
                            >
                                {url.includes('login')
                                    ? t('create a free account')
                                    : t('login with your account')}
                            </Text>
                        </Text>
                    </Stack>

                    <Box
                        mt="md"
                        sx={(theme) => ({
                            width: '100%',
                            [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
                                width: 400,
                            },
                        })}
                    >
                        {children}
                    </Box>
                </Stack>
            </Stack>
        </AppLayout>
    )
}
