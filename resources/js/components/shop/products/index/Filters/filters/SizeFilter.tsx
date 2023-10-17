import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/lib/store/filters.store'
import { TFilterOptions } from '@/pages/shop/products'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const SizeFilter = ({
    options,
}: {
    options: TFilterOptions['sizes']
}) => {
    const { t } = useTranslation()

    const sizes = useFiltersStore((s) => s.sizes)
    const setSizes = useFiltersStore((s) => s.setSizes)

    // Filter sizes by selected gender
    // if there are 0 or 3 selected genders, it means all genders selected
    const genders = useFiltersStore((s) => s.genders)
    const sizeOptionsByGender = useMemo(() => {
        return genders.length === 0 || genders.length === 3
            ? options
            : options.filter((opt) => genders.includes(opt.gender))
    }, [genders])

    return (
        <AccordionItem value="size">
            <AccordionTrigger className="text-base">
                <div className="flex items-center space-x-2">
                    <span>{t('Size')}</span>

                    {!!sizes.length && (
                        <Badge variant="secondary">{sizes.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                    {sizeOptionsByGender.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() =>
                                setSizes(
                                    sizes.includes(value)
                                        ? sizes.filter((s) => s !== value)
                                        : [...sizes, value],
                                )
                            }
                            className={clsx([
                                'p-2 border-[1.5px] rounded-md',
                                sizes.includes(value) &&
                                    'border-accent-foreground',
                            ])}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
