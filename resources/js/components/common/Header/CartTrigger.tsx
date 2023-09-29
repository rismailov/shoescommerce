import useCartStore from '@/lib/store/cart.store'
import { ActionIcon, Indicator } from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react'

export const CartTrigger = () => {
    const items = useCartStore((s) => s.items)
    const toggleCart = useCartStore((s) => s.toggleIsCartOpened)

    return (
        <Indicator
            label={items.reduce((prev, cur) => prev + cur.amount, 0)}
            size={18}
            offset={3}
            disabled={!items.length}
            styles={{
                indicator: {
                    fontWeight: 600,
                    pointerEvents: 'none',
                },
            }}
        >
            <ActionIcon size="lg" onClick={toggleCart} radius="xl">
                <IconShoppingCart className="sprite sprite-lg" />
            </ActionIcon>
        </Indicator>
    )
}
