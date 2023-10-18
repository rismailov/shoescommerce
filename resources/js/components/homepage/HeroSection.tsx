import { Link } from '@inertiajs/react'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'

export const HeroSection = () => {
    const { t } = useTranslation()

    return (
        <section className="flex flex-col space-y-10">
            <img
                src="/images/hero.webp"
                className="object-fit object-cover h-[400px]"
            />

            <div className="container">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold uppercase">
                        {t('new arrivals')}
                    </h1>

                    <p className="max-w-xl text-center text-lg text-muted-foreground mt-2 sm:mt-3 mb-3 sm:mb-5">
                        {t(
                            'Nothing as fly, nothing as comfortable, nothing as proven. Now featuring the Air Force 1 Pro Tech.',
                        )}
                    </p>

                    <Button
                        size="lg"
                        variant="accent"
                        className="rounded-full text-base"
                        asChild
                    >
                        <Link href={route('products.index')}>
                            {t('Shop Now')}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
