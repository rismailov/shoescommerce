// import { Cart } from '@/components/shop/Cart'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import AppLayout from './AppLayout'

export default function ShopLayout({ children }: PropsWithChildren) {
    return (
        <AppLayout>
            <>
                {/* <Cart /> */}

                <div className={clsx(['pb-[50px]', 'pt-8'])}>{children}</div>
            </>
        </AppLayout>
    )
}
