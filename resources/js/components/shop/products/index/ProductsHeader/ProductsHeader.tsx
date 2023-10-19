import { TFilterOptions } from '@/pages/shop/products'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { MobileFilters } from '../Filters/MobileFilters'
import { SortProducts } from './SortProducts'
import { ToggleFilters } from './ToggleFilters'

export const ProductsHeader = ({
    totalProductsCount,
    showFilters,
    setShowFilters,
    options,
}: {
    totalProductsCount: number
    showFilters: boolean
    setShowFilters: Dispatch<SetStateAction<boolean>>
    options: TFilterOptions
}) => {
    const { t } = useTranslation()

    return (
        <section className="sticky top-[-1px] z-10 bg-white flex items-center justify-between h-[60px]">
            <div>
                <h2 className="hidden lg:inline font-bold text-xl">{`Nike ${t(
                    'Shoes',
                )}`}</h2>

                <MobileFilters options={options} />
            </div>

            <div className="flex items-center space-x-5">
                <p className="text-muted-foreground lowercase text-sm lg:text-base">
                    {`${totalProductsCount} ${
                        totalProductsCount === 1 ? t('Result') : t('Results')
                    }`}
                </p>

                <SortProducts />

                <ToggleFilters
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                />
            </div>
        </section>
    )
}
