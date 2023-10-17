import { GENDERS } from '@/constants'
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

    return GENDERS.map((gender) => ({
        gender,
        label: t(gender as any),
    }))
}
