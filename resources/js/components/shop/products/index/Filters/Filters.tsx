import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TFilterOptions } from '@/pages/shop/products'
import { useTranslation } from 'react-i18next'
import { CategoryFilter } from './filters/CategoryFilter'
import { ColourFilter } from './filters/ColourFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'

export const Filters = ({ options }: { options: TFilterOptions }) => {
    const { t } = useTranslation()

    return (
        <div className="sticky overflow-y-auto top-[90px]">
            <ScrollArea
                type="always"
                className="w-[20%] h-[calc(100vh-140px)] pr-8"
            >
                <h1 className="mb-3 font-bold text-3xl leading-none">
                    {t('Filters')}
                </h1>

                <Accordion
                    type="multiple"
                    defaultValue={['category', 'price', 'size', 'colour']}
                    className="w-full"
                >
                    <CategoryFilter />

                    <PriceFilter />

                    <SizeFilter options={options.sizes} />

                    <ColourFilter options={options.colours} />
                </Accordion>
            </ScrollArea>
        </div>
    )
}
