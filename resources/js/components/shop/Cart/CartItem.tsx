import { Button } from '@/components/ui/button'
import useCartStore, { TCartItem } from '@/lib/store/cart.store'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const MAX_AMOUNT = 5
const MIN_AMOUNT = 1

export const CartItem = ({
    cartItem,
    variant,
}: {
    cartItem: TCartItem
    variant: 'cart' | 'checkout'
}) => {
    const { t } = useTranslation()

    const updateItemAmount = useCartStore((state) => state.updateItemAmount)
    const removeItem = useCartStore((state) => state.removeItem)

    const changeAmount = (action: 'inc' | 'dec') => {
        if (
            (action === 'inc' && cartItem.amount === MAX_AMOUNT) ||
            (action === 'dec' && cartItem.amount === MIN_AMOUNT)
        ) {
            return
        }

        updateItemAmount({
            itemID: `${cartItem.id}-${cartItem.size.value}`,
            amount:
                action === 'inc' ? cartItem.amount + 1 : cartItem.amount - 1,
        })
    }

    return (
        <div className="flex items-stretch overflow-hidden space-x-4">
            {/* ITEM IMAGE */}
            <img
                src={cartItem.imageUrl}
                className={clsx(
                    'object-center object-cover',
                    variant === 'cart' ? 'w-24' : 'w-24',
                )}
            />

            {/* ITEM INFO */}
            <div className="flex-1 flex flex-col items-start justify-between">
                <div className="w-full flex flex-col">
                    <div className="flex items-center justify-between font-semibold">
                        <h3>{`Nike ${cartItem.name}`}</h3>
                        <h3>${cartItem.price}</h3>
                    </div>

                    <p className="text-muted-foreground">
                        {t(cartItem.gender as any)}
                    </p>

                    <p className="text-muted-foreground">{`${t('Size')} - ${
                        cartItem.size.label
                    }`}</p>
                </div>

                {variant === 'cart' && (
                    <div className="w-full flex items-center justify-between">
                        {/* COUNTER */}
                        <div className="flex items-center space-x-3">
                            <Button
                                onClick={() => changeAmount('dec')}
                                size="sm"
                                variant="ghost"
                                className={clsx(
                                    'py-1 px-1.5',
                                    cartItem.amount === MIN_AMOUNT &&
                                        'pointer-events-none opacity-30',
                                )}
                            >
                                <IconMinus className="sprite" size={15} />
                            </Button>

                            <span className="select-none">
                                {cartItem.amount}
                            </span>

                            <Button
                                onClick={() => changeAmount('inc')}
                                size="sm"
                                variant="ghost"
                                className={clsx(
                                    'py-1 px-1.5',
                                    cartItem.amount === MAX_AMOUNT &&
                                        'pointer-events-none opacity-30',
                                )}
                            >
                                <IconPlus className="sprite" size={15} />
                            </Button>
                        </div>

                        {/* REMOVE BTN */}
                        <Button
                            onClick={() => removeItem(cartItem.id)}
                            variant="link"
                            size="sm"
                            className="text-sm font-medium text-secondary-foreground"
                        >
                            {t('Remove')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
