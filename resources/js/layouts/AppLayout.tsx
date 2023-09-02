import { Header } from '@/components/common/Header/Header'
import theme from '@/lib/mantine/theme'
import { usePage } from '@inertiajs/react'
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AppLayout({ children }: PropsWithChildren) {
    const [queryClient] = useState<QueryClient>(() => new QueryClient())

    /* Mantine color scheme */
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    /* Locale */
    const { locale } = usePage().props
    const { i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale])

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Header />

                    <Notifications color="dark" position="bottom-right" />

                    {children}
                </QueryClientProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
