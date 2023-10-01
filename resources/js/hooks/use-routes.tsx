import { CATEGORIES } from '@/constants'
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

type TRoute =
    | {
          label: string
          href: string
          category?: never
      }
    | {
          label: string
          category: string
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

    return CATEGORIES.map((category) => ({
        category: category,
        // @ts-ignore
        label: t(category),
    }))
}
