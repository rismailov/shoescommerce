import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TCartItem = {
    id: string // looks like: `${product.id}-${product.size.value}`
    imageUrl: string
    name: string
    size: { value: string; label: number }
    price: string
    amount: number
    gender: string
}

type CartStore = {
    items: TCartItem[]
    isCartOpened: boolean
    addItem: (item: TCartItem) => void
    removeItem: (itemID: string) => void
    updateItemAmount: (data: { itemID: string; amount: number }) => void
    toggleIsCartOpened: () => void
}

// persist cart items in Local Storage
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            isCartOpened: false,
            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === item.id)

                    return {
                        items: !existing
                            ? [...state.items, item]
                            : state.items.map((i) =>
                                  i.id === item.id
                                      ? { ...i, amount: i.amount + 1 }
                                      : i,
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
        }),
        {
            name: 'cart-items',
            partialize: (state) => ({ items: state.items }),
        },
    ),
)

export default useCartStore
