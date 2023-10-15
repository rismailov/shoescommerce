import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { SectionLayout } from './SectionLayout'

const TrendingItem = ({ src, title }: { src: string; title: string }) => {
    return (
        <Link
            href={route('products.index')}
            className="flex flex-col space-y-3"
        >
            <div className="overflow-hidden rounded-xl">
                <img
                    src={src}
                    className="object-center object-cover hover:scale-105 transition-transform duration-300 ease-out"
                />
            </div>

            <h2 className="text-xl tracking-tight font-medium">{title}</h2>
        </Link>
    )
}

export const TrendingSection = () => {
    const { t } = useTranslation()

    return (
        <SectionLayout title={t('Trending')}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <TrendingItem
                    title="Kicks, Essentials & More"
                    src="/images/trending/0.webp"
                />

                <TrendingItem
                    title="Nike Style"
                    src="/images/trending/1.webp"
                />

                <TrendingItem
                    title="HBCU Varsity Collection"
                    src="/images/trending/2.webp"
                />
            </div>
        </SectionLayout>
    )
}
