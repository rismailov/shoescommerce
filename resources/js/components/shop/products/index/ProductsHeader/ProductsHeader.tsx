import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { SortProducts } from './SortProducts'
import { ToggleFilters } from './ToggleFilters'

export const ProductsHeader = ({
    totalProductsCount,
    showFilters,
    setShowFilters,
}: {
    totalProductsCount: number
    showFilters: boolean
    setShowFilters: Dispatch<SetStateAction<boolean>>
}) => {
    const { t } = useTranslation()

    return (
        <section className="sticky top-[-1px] z-10 bg-white flex items-center justify-between h-[60px]">
            <h2 className="font-bold text-xl">{`Nike ${t('Shoes')}`}</h2>

            <div className="flex items-center space-x-5">
                <p className="text-muted-foreground lowercase">
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
