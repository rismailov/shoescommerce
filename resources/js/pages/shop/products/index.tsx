import { Filters } from '@/components/shop/products/index/Filters'
import { Products } from '@/components/shop/products/index/Products'
import { ProductsHeader } from '@/components/shop/products/index/ProductsHeader'
import { TOption } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type TFilterOptions = {
    sizes: TOption<{ gender: string }>[]
    colours: TOption<{ hex: string }>[]
}

export default function ProductsIndex() {
    const { t } = useTranslation()

    const { filterOptions } = usePage<{ filterOptions: TFilterOptions }>().props

    const [showFilters, setShowFilters] = useState<boolean>(true)

    const [totalProductsCount, setTotalProductsCount] = useState<number>(0)

    return (
        <div className="container">
            <Head title={t('Shop')} />

            {/* header */}
            <ProductsHeader
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                totalProductsCount={totalProductsCount}
            />

            {/* main */}
            <AnimatePresence initial={false} mode="wait">
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
