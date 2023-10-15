import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { SectionLayout } from './SectionLayout'

const FeaturedItem = ({
    preTitle,
    title,
    imgSrc,
}: {
    preTitle: string
    title: string
    imgSrc: string
}) => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col relative overflow-hidden rounded-2xl group">
            <img
                src={imgSrc}
                className="object-center object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-accent-foreground/40 to-transparent p-8 flex flex-col justify-end">
                <p className="text-xl text-accent/75 cursor-default">
                    {preTitle}
                </p>

                <h2 className="text-xl lg:text-2xl font-semibold text-accent cursor-default">
                    {title}
                </h2>

                <Button
                    className="self-start mt-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium px-7 h-10"
                    asChild
                >
                    <Link href={route('products.index')}>{t('Shop')}</Link>
                </Button>
            </div>
        </div>
    )
}

export const FeaturedSection = () => {
    const { t } = useTranslation()

    return (
        <SectionLayout title={t('Featured')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FeaturedItem
                    preTitle="New from Jordan Basketball"
                    title="Featuring the Zion 3"
                    imgSrc="/images/featured/0.webp"
                />

                <FeaturedItem
                    preTitle="Rep Your School"
                    title="Dunk Madness"
                    imgSrc="/images/featured/1.jpeg"
                />
            </div>
        </SectionLayout>
    )
}
