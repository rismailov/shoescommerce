import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/lib/store/filters.store'
import { TOption } from '@/types'
import { IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export const ColourFilter = ({
    options,
}: {
    options: TOption<{ hex: string }>[]
}) => {
    const { t } = useTranslation()

    const colours = useFiltersStore((s) => s.colours)
    const setColours = useFiltersStore((s) => s.setColours)

    return (
        <AccordionItem value="colour" className="border-none">
            <AccordionTrigger className="text-lg">
                <div className="flex items-center space-x-2">
                    <span>{t('Colour')}</span>

                    {!!colours.length && (
                        <Badge variant="secondary">{colours.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                    {options.map(({ value, label, hex }) => (
                        <button
                            key={value}
                            className="flex flex-col items-center space-y-1"
                            onClick={() =>
                                setColours(
                                    colours.includes(value)
                                        ? colours.filter((c) => c !== value)
                                        : [...colours, value],
                                )
                            }
                        >
                            {/* color swatch */}
                            <div
                                className="w-7 h-7 flex items-center justify-center rounded-full border"
                                style={{ background: hex }}
                            >
                                {/* checkmark */}
                                {colours.includes(value) && (
                                    <IconCheck
                                        size={15}
                                        strokeWidth={2.5}
                                        className={clsx(
                                            hex === '#ffffff'
                                                ? 'stroke-accent-foreground'
                                                : 'stroke-white',
                                        )}
                                    />
                                )}
                            </div>

                            {/* color name */}
                            <p className="text-center">{label}</p>
                        </button>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
