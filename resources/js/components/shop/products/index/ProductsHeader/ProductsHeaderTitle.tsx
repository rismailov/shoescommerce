import useFiltersStore from '@/lib/store/filters.store'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ProductsHeaderTitle = () => {
    const { t } = useTranslation()
    const genders = useFiltersStore((s) => s.genders)
    const [title, setTitle] = useState<string>(`${t('All')} ${t('Shoes')}`)

    useEffect(() => {
        if (genders.length === 0 || genders.length === 3) {
            setTitle(`${t('All')} ${t('Shoes')}`)
        }

        if (genders.length === 1) {
            setTitle(`${t((genders[0] + "'s") as any)} ${t('Shoes')}`)
        }

        if (genders.length === 2) {
            setTitle(
                `${t((genders[0] + "'s") as any)} ${t('and')} ${t(
                    (genders[1] + "'s") as any,
                )} ${t('Shoes')}`,
            )
        }
    }, [genders, setTitle, t])

    return <h2 className="font-bold text-xl">{title}</h2>
}
