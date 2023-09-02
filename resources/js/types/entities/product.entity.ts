import { TOption, TPaginatedData } from '..'
import { ReviewEntity } from './review.entity'

interface ProductEntityBase {
    id: number
    nanoid: string
    name: string
    description: string
    category: TOption
    price: {
        initial: string
        discounted: string | null // null means no discount
    }
    colour: TOption
    colours: TOption<{ hex: string }>[]
    sizes: TOption[]
    images: {
        id: number
        url: string
        order: number
    }[]
}

/**
 * Slightly modified interfaces for each route action.
 */
export interface UserProductIndexEntity extends ProductEntityBase {
    reviewsCount: number
    averageStars: number
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
    reviews: TPaginatedData<ReviewEntity[]>
    averageStars: number
}

export interface AdminProductEntity extends ProductEntityBase {
    createdAt: string
    discountPercent: number
}
