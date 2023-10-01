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
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-primary-foreground bg-primary border-2 border-border rounded-full -top-2 -right-2">
                    {items.reduce((prev, cur) => prev + cur.amount, 0)}
                </div>
            )}
        </Button>
    )
}
