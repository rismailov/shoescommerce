import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useFiltersStore, { TSortValue } from '@/lib/store/filters.store'
import { useTranslation } from 'react-i18next'
import { sortOptions } from '../../ProductsHeader/SortProducts'

export const SortByFilter = () => {
    const { t } = useTranslation()

    const sort = useFiltersStore((s) => s.sort)
    const setSort = useFiltersStore((s) => s.setSort)

    return (
        <AccordionItem value="sort">
            <AccordionTrigger className="text-base pt-0">
                <div className="flex items-center space-x-2">
                    <span>{t('Sort By')}</span>
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <RadioGroup
                    value={sort}
                    onValueChange={(value: TSortValue) => setSort(value)}
                >
                    {sortOptions.map((opt) => (
                        <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem value={opt.value} id={opt.value} />

                            <Label htmlFor={opt.value} className="text-base">
                                {opt.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </AccordionContent>
        </AccordionItem>
    )
}
