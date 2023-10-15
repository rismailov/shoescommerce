import { TOption } from '..'

interface ProductEntityBase {
    id: number
    nanoid: string
    name: string
    description: string
    gender: string
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
        image: string
    }[]
    colour: string
    availableSizes: { value: string; label: number }[]
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
