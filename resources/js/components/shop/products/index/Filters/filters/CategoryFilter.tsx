import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import useFiltersStore from '@/lib/store/filters.store'
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export const CategoryFilter = () => {
    const { t } = useTranslation()
    const { categories: categoryOptions } = usePage().props

    const categories = useFiltersStore((s) => s.categories)
    const setCategories = useFiltersStore((s) => s.setCategories)

    return (
        <AccordionItem value="category">
            <AccordionTrigger className="text-lg">
                {t('Category')}
            </AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col space-y-3">
                    {categoryOptions!.map(({ value, label }) => (
                        <Checkbox
                            key={value}
                            id={value}
                            label={label}
                            value={value}
                            checked={categories.includes(value)}
                            onCheckedChange={(checked) => {
                                checked
                                    ? setCategories([...categories, value])
                                    : setCategories(
                                          categories.filter(
                                              (cat) => cat !== value,
                                          ),
                                      )
                            }}
                        />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
