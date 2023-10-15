import { create } from 'zustand'

export type TCartItem = {
    id: string // looks like: `${product.id}-${product.size.id}`
    imageUrl: string
    name: string
    size: { value: string; label: number }
    // colour: { id: string; name: string }
    price: string
    amount: number
}

type CartStore = {
    items: TCartItem[]
    isCartOpened: boolean
    addItem: (item: TCartItem) => void
    removeItem: (itemID: string) => void
    updateItemAmount: (data: { itemID: string; amount: number }) => void
    toggleIsCartOpened: () => void
}

const useCartStore = create<CartStore>((set) => ({
    items: [],
    isCartOpened: false,
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id)

            return {
                items: !existing
                    ? [...state.items, item]
                    : state.items.map((i) =>
                          i.id === item.id ? { ...i, amount: i.amount + 1 } : i,
                      ),
            }
        }),
    removeItem: (itemID) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== itemID),
        })),
    updateItemAmount: ({ itemID, amount }) =>
        set((state) => ({
            items: state.items.map((item) =>
                `${item.id}-${item.size.value}` === itemID
                    ? { ...item, amount }
                    : item,
            ),
        })),
    toggleIsCartOpened: () =>
        set((state) => ({ isCartOpened: !state.isCartOpened })),
}))

export default useCartStore
