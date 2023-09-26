import { TOption } from '..'

interface ProductEntityBase {
    id: number
    nanoid: string
    name: string
    description: string
    category: TOption
    colour: TOption
    price: {
        initial: string
        discounted: string | null // null means no discount
    }
    avgStars: number
}

/**
 * Slightly modified interfaces for each route action.
 */
export interface UserProductIndexEntity extends ProductEntityBase {
    reviewsCount: number
    img: {
        url: string
    }
}

export interface UserProductShowEntity extends ProductEntityBase {
    availableColours: {
        nanoid: string
        colour: {
            value: string
            label: string
            hex: string
        }
    }[]
    availableSizes: TOption[]
    images: {
        id: number
        url: string
        order: number
    }[]
}

export interface AdminProductEntity extends ProductEntityBase {
    createdAt: string
    discountPercent: number
}
