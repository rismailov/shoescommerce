import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header/Header'
import { Toaster } from '@/components/ui/toaster'
import { usePage } from '@inertiajs/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MobileMenu } from './MobileMenu'

const queryClient = new QueryClient()

export default function AppLayout({ children }: PropsWithChildren) {
    // const [queryClient] = useState<QueryClient>(() => new QueryClient())

    /* Locale */
    const { locale } = usePage().props
    const { i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale])

    /* Mobile menu state */
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    /* */
    const { url } = usePage()

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />

            <div className="relative h-full min-h-screen flex flex-col">
                <Header
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                {isMobileMenuOpen && (
                    <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
                )}

                <main className="flex-1">{children}</main>

                {!url.includes('/auth') && <Footer />}
            </div>
        </QueryClientProvider>
    )
}
