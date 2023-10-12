import { GENDERS } from '@/constants'
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

type TRoute =
    | {
          label: string
          href: string
          gender?: never
      }
    | {
          label: string
          gender: string
          href?: never
      }

export const useRoutes = (): TRoute[] => {
    const { t } = useTranslation()
    const { component } = usePage()

    if (component.startsWith('admin')) {
        return [
            {
                href: '/shop',
                label: t('Shop'),
            },
            {
                href: '/admin/products',
                label: t('Products'),
            },
            {
                href: '/admin/colours',
                label: t('Colours'),
            },
        ]
    }

    return GENDERS.map((gender) => ({
        gender,
        label: t(gender as any),
    }))
}
