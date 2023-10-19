import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { GENDERS } from '@/constants'
import useFiltersStore from '@/lib/store/filters.store'
import { useTranslation } from 'react-i18next'

export const GenderFilter = () => {
    const { t } = useTranslation()

    const genders = useFiltersStore((s) => s.genders)
    const setGenders = useFiltersStore((s) => s.setGenders)

    return (
        <AccordionItem value="gender">
            <AccordionTrigger className="text-base">
                {t('Gender')}
            </AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col space-y-1">
                    {GENDERS.map((gender) => (
                        <Checkbox
                            key={gender}
                            id={gender}
                            label={t(gender as any)}
                            value={gender}
                            checked={genders.includes(gender)}
                            onCheckedChange={(checked) => {
                                setGenders(
                                    checked
                                        ? [...genders, gender]
                                        : genders.filter((g) => g !== gender),
                                )
                            }}
                        />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
