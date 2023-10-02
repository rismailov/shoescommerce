import { Header } from '@/components/common/Header/Header'
import { ThemeProvider } from '@/context/theme-provider'
import { usePage } from '@inertiajs/react'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MobileMenu } from './MobileMenu'
import { Toaster } from '@/components/ui/toaster'

export default function AppLayout({ children }: PropsWithChildren) {
    const [queryClient] = useState<QueryClient>(() => new QueryClient())

    /* Locale */
    const { locale } = usePage().props
    const { i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale])

    /** Mobile menu state */
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <Toaster />

                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <div className="relative h-full min-h-screen flex flex-col justify-between">
                        <Header
                            isMobileMenuOpen={isMobileMenuOpen}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                        />

                        {isMobileMenuOpen && <MobileMenu />}

                        {/* <Notifications color="dark" position="bottom-right" /> */}

                        <main className="pt-12 sm:pt-16">{children}</main>
                    </div>
                </ThemeProvider>
            </QueryClientProvider>
        </MantineProvider>
    )
}
