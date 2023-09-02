import { atom } from 'jotai'

export type CartItem = {
    // TODO: use nanoid instead?
    id: string // looks like: `${product.id}-${product.size.id}`
    imageUrl: string
    name: string
    size: { id: string; name: string }
    colour: { id: string; name: string }
    price: string
    amount: number
}

// states
export const cartItemsAtom = atom<CartItem[]>([])
export const isCartOpenedAtom = atom<boolean>(false)

// setters
export const addCartItemAtom = atom(null, (get, set, item: CartItem) => {
    const items = get(cartItemsAtom)
    const isItemInCart = !!items.find((i) => i.id === item.id)

    set(cartItemsAtom, [
        ...items,
        isItemInCart ? { ...item, amount: item.amount++ } : item,
    ])
})

export const updateCartItemsAmountAtom = atom(
    null,
    (get, set, { itemID, amount }) =>
        set(
            cartItemsAtom,
            get(cartItemsAtom).map((item) =>
                `${item.id}-${item.size.id}` === itemID
                    ? { ...item, amount }
                    : item,
            ),
        ),
)

export const removeCartItemAtom = atom(null, (get, set, itemID) =>
    set(
        cartItemsAtom,
        get(cartItemsAtom).filter((item) => item.id !== itemID),
    ),
)

export const toggleCartAtom = atom(null, (get, set) =>
    set(isCartOpenedAtom, !get(isCartOpenedAtom)),
)
