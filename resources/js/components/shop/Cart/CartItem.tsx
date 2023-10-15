import { Button } from '@/components/ui/button'
import useCartStore, { TCartItem } from '@/lib/store/cart.store'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const MAX_AMOUNT = 5
const MIN_AMOUNT = 1

export const CartItem = ({ cartItem }: { cartItem: TCartItem }) => {
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
        <section className="h-36 flex items-stretch rounded-lg overflow-hidden border">
            {/* ITEM IMAGE */}
            <img
                src={cartItem.imageUrl}
                className="w-36 h-full object-center object-cover"
            />

            {/* ITEM INFO */}
            <div className="py-3 px-4 flex-1 h-full flex flex-col items-start justify-between">
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

                        <span className="select-none">{cartItem.amount}</span>

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
                        className="text-sm p-0 font-medium underline hover:text-accent-foreground"
                    >
                        {t('Remove')}
                    </Button>
                </div>
            </div>
        </section>
    )
}
