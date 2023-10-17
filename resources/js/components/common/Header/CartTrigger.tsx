import { Button } from '@/components/ui/button'
import useCartStore from '@/lib/store/cart.store'
import { IconShoppingCart } from '@tabler/icons-react'

export const CartTrigger = () => {
    const items = useCartStore((s) => s.items)
    const toggleCart = useCartStore((s) => s.toggleIsCartOpened)

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={toggleCart}
            className="rounded-full relative"
        >
            <IconShoppingCart className="sprite sprite-md" />

            {!!items.length && (
                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-primary-foreground bg-primary rounded-full -top-[3px] -right-[3px]">
                    {items.reduce((prev, cur) => prev + cur.amount, 0)}
                </div>
            )}
        </Button>
    )
}
