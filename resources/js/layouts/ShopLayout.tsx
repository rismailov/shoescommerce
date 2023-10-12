// import { Cart } from '@/components/shop/Cart'
import { PropsWithChildren } from 'react'
import AppLayout from './AppLayout'

export default function ShopLayout({ children }: PropsWithChildren) {
    return (
        <AppLayout>
            <>
                {/* <Cart /> */}

                {children}
            </>
        </AppLayout>
    )
}
