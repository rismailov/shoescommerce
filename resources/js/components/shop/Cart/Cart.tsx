import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import useCartStore from '@/lib/store/cart.store'
import { IconBox } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CartItem } from './CartItem'
import { sleep } from '@/utils'
import { router } from '@inertiajs/react'
import { useState } from 'react'

export const Cart = () => {
    const { t } = useTranslation()

    const isCartOpened = useCartStore((state) => state.isCartOpened)
    const toggleCart = useCartStore((state) => state.toggleIsCartOpened)
    const items = useCartStore((state) => state.items)

    // show loader on checkout button; purely cosmetical, safe to remove
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Sheet open={isCartOpened} onOpenChange={toggleCart}>
            <SheetContent className="w-full flex flex-col justify-between xs:max-w-md sm:max-w-md md:max-w-lg rounded-tl-xl rounded-bl-xl shadow-none">
                <SheetHeader className="flex flex-col space-y-5">
                    <SheetTitle>
                        <div className="flex items-center">
                            <h2 className="text-2xl font-bold">{t('Cart')}</h2>

                            <Badge
                                variant="secondary"
                                className="ml-3 text-base"
                            >
                                {items.reduce(
                                    (prev, cur) => prev + cur.amount,
                                    0,
                                )}
                            </Badge>
                        </div>
                    </SheetTitle>

                    <Separator />
                </SheetHeader>

                <section className="flex-1 h-full overflow-y-auto">
                    <ScrollArea className="h-full">
                        <AnimatePresence mode="popLayout">
                            {!items.length ? (
                                <p className="pt-5 text-lg text-center text-muted-foreground">
                                    {t('Your cart is empty')}
                                </p>
                            ) : (
                                <div className="flex flex-col space-y-5">
                                    {items.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                                transition: {
                                                    duration: 0,
                                                },
                                            }}
                                        >
                                            <CartItem
                                                cartItem={item}
                                                variant="cart"
                                            />

                                            {idx !== items.length - 1 && (
                                                <Separator className="mt-5" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </ScrollArea>
                </section>

                <SheetFooter>
                    <div className="w-full flex flex-col space-y-5">
                        <Separator />

                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg">
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

                            <div className="inline-flex items-center space-x-2 text-muted-foreground">
                                <IconBox className="sprite sprite-sm" />

                                <span>{t('Free shipping')}</span>
                            </div>
                        </div>

                        <Button
                            onClick={async () => {
                                setIsLoading(true)
                                await sleep()

                                router.visit(route('checkout'), {
                                    preserveScroll: true,
                                    preserveState: true,
                                })
                                toggleCart()
                                setIsLoading(false)
                            }}
                            loading={isLoading}
                            variant="accent"
                            size="lg"
                            className="rounded-lg h-14 font-medium"
                            disabled={!items.length}
                        >
                            {t('Checkout')}
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
