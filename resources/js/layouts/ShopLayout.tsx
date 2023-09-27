import { Cart } from '@/components/shop/Cart'
import { usePage } from '@inertiajs/react'
import { Box } from '@mantine/core'
import { PropsWithChildren } from 'react'
import AppLayout from './AppLayout'

export default function ShopLayout({ children }: PropsWithChildren) {
    const { url } = usePage()

    return (
        <AppLayout>
            <>
                <Cart />

                <Box mt={60} pt={url === '/' ? 0 : 30} pb={50}>
                    {children}
                </Box>
            </>
        </AppLayout>
    )
}
