// import { Cart } from '@/components/shop/Cart'
import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import AppLayout from './AppLayout'

export default function ShopLayout({ children }: PropsWithChildren) {
    const { url } = usePage()

    return (
        <AppLayout>
            <>
                {/* <Cart /> */}

                <div
                    className={clsx(['pb-[50px]', url === '/' && 'pt-[30px]'])}
                >
                    {children}
                </div>
            </>
        </AppLayout>
    )
}
