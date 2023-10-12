import { Filters } from '@/components/shop/products/index/Filters'
import { Products } from '@/components/shop/products/index/Products'
import { ProductsHeader } from '@/components/shop/products/index/ProductsHeader'
import { TOption } from '@/types'
import { usePage } from '@inertiajs/react'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export type TFilterOptions = {
    sizes: TOption[]
    colours: TOption<{ hex: string }>[]
}

export default function ProductsIndex() {
    const { filterOptions } = usePage<{ filterOptions: TFilterOptions }>().props

    const [showFilters, setShowFilters] = useState<boolean>(true)

    const [totalProductsCount, setTotalProductsCount] = useState<number>(0)

    return (
        <div className="container">
            {/* header */}
            <ProductsHeader
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                totalProductsCount={totalProductsCount}
            />

            {/* main */}
            <AnimatePresence initial={false} mode="popLayout">
                <div className="relative flex">
                    {showFilters && <Filters options={filterOptions} />}

                    <Products
                        setTotalProductsCount={setTotalProductsCount}
                        showFilters={showFilters}
                    />
                </div>
            </AnimatePresence>
        </div>
    )
}
