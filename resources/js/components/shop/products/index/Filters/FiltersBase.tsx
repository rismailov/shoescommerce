import { Accordion } from '@/components/ui/accordion'
import { TFilterOptions } from '@/pages/shop/products'
import { ColourFilter } from './filters/ColourFilter'
import { GenderFilter } from './filters/GenderFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'
import { SortByFilter } from './filters/SortByFilter'

export const FiltersBase = ({ options }: { options: TFilterOptions }) => {
    return (
        <Accordion
            type="multiple"
            defaultValue={['sort', 'gender', 'price', 'size', 'colour']}
            className="w-full"
        >
            <SortByFilter />

            <GenderFilter />

            <PriceFilter />

            <SizeFilter options={options.sizes} />

            <ColourFilter options={options.colours} />
        </Accordion>
    )
}
