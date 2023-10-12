import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import useFiltersStore from '@/lib/store/filters.store'
import { IconCurrencyDollar } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'

export const PriceFilter = () => {
    const { t } = useTranslation()

    const price = useFiltersStore((s) => s.price)
    const setPrice = useFiltersStore((s) => s.setPrice)

    // min price
    const [priceMin, setPriceMin] = useState<string | number>('')
    const debouncedMin = useDebounce(priceMin, 500)
    useEffect(() => {
        setPrice({ ...price, min: debouncedMin })
    }, [debouncedMin, setPrice])

    // max price
    const [priceMax, setPriceMax] = useState<string | number>('')
    const debouncedMax = useDebounce(priceMax, 500)
    useEffect(() => {
        setPrice({ ...price, max: debouncedMax })
    }, [debouncedMax, setPrice])

    return (
        <AccordionItem value="price">
            <AccordionTrigger className="text-lg">
                {t('Price')}
            </AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col space-y-4">
                    {/* on sale */}
                    <Checkbox
                        id="sale"
                        label="On sale"
                        value="0"
                        checked={price.onSale}
                        onCheckedChange={(checked: boolean) =>
                            setPrice({ ...price, onSale: checked })
                        }
                    />

                    {/* price range */}
                    <div className="flex items-center space-x-3 pr-1">
                        {/* min price */}
                        <div className="flex items-center space-x-1">
                            <IconCurrencyDollar className="sprite sprite-md" />

                            <NumericFormat
                                value={priceMin}
                                onValueChange={({ value }) =>
                                    setPriceMin(value)
                                }
                                decimalScale={0}
                                customInput={Input}
                                placeholder={t('min')}
                                allowNegative={false}
                            />
                        </div>

                        <p className="opacity-30">—</p>

                        {/* max price */}
                        <div className="flex items-center space-x-1">
                            <IconCurrencyDollar className="sprite sprite-md" />

                            <NumericFormat
                                value={priceMax}
                                onValueChange={({ value }) =>
                                    setPriceMax(value)
                                }
                                decimalScale={0}
                                customInput={Input}
                                placeholder={t('max')}
                                allowNegative={false}
                            />
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
