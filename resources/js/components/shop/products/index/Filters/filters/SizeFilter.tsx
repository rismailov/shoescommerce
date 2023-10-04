import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/lib/store/filters.store'
import { TOption } from '@/types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export const SizeFilter = ({ options }: { options: TOption[] }) => {
    const { t } = useTranslation()

    const sizes = useFiltersStore((s) => s.sizes)
    const setSizes = useFiltersStore((s) => s.setSizes)

    return (
        <AccordionItem value="size">
            <AccordionTrigger className="text-lg">
                <div className="flex items-center space-x-2">
                    <span>{t('Size')}</span>

                    {!!sizes.length && (
                        <Badge variant="secondary">{sizes.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                    {options.map(({ value, label }) => (
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
                                sizes.includes(value) && 'border-primary',
                            ])}
                        >
                            {label.toUpperCase()}
                        </button>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
