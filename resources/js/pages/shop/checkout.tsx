import { CartItem } from '@/components/shop/Cart/CartItem'
import { StripeCheckoutForm } from '@/components/shop/StripeCheckoutForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import useCartStore from '@/lib/store/cart.store'
import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Checkout() {
    const { t } = useTranslation()
    const items = useCartStore((s) => s.items)

    useEffect(() => {
        if (!items.length) {
            window.history.back()
        }
    }, [items])

    return (
        <div className="container mt-8">
            <Head title={t('Checkout')} />

            <div className="flex flex-col sm:flex-row justify-center space-y-10 sm:space-y-0 sm:space-x-10 md:space-x-16">
                {/* checkout form */}
                <div className="w-full sm:max-w-md">
                    <StripeCheckoutForm />
                </div>

                {/* products and total price */}
                <div className="w-full sm:max-w-md flex flex-col">
                    <h3 className="font-semibold text-2xl">{t('Products')}</h3>

                    <p className="mt-2 mb-4 text-lg font-medium">
                        {`${t('Total')}: $`}
                        {items.reduce<number | string>(
                            (prev, cur) =>
                                (
                                    +prev +
                                    parseFloat(cur.price) * cur.amount
                                ).toFixed(2),
                            0.0,
                        )}
                    </p>

                    <ScrollArea className="h-[520px] pr-8" type="always">
                        <div className="flex flex-col space-y-5">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    cartItem={item}
                                    variant="checkout"
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
