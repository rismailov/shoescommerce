import { LOAD_MORE_PRODUCTS_AMOUNT } from '@/constants'
import { atom } from 'jotai'

export type TSortValues = 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc'

type TPriceProductFilter = {
    min: number | null
    max: number | null
    onSale: boolean
}

type TFiltersAtom = {
    categories: string[]
    sizes: string[]
    colours: string[]
    price: TPriceProductFilter
    sort: TSortValues
    limit: number
}

export const filtersAtom = atom<TFiltersAtom>({
    categories: [],
    sizes: [],
    colours: [],
    price: { min: null, max: null, onSale: false },
    sort: 'date-desc',
    limit: LOAD_MORE_PRODUCTS_AMOUNT,
})

export const updatePriceParamAtom = atom(
    null,
    (get, set, param: Partial<TPriceProductFilter>) =>
        set(filtersAtom, {
            ...get(filtersAtom),
            price: { ...get(filtersAtom).price, ...param },
        }),
)
