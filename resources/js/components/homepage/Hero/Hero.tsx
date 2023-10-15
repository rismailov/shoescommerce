import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media.query'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { AbstractLines } from './sprites/AbstractLines'
import { AirMaxTitle } from './sprites/AirMaxTitle'
import { screens } from 'tailwindcss/defaultTheme'

export const Hero = () => {
    const { t } = useTranslation()
    const matches = useMediaQuery(`(min-width: ${screens.sm})`)

    return (
        <div>
            <div className="container">
                <div className="w-full h-full min-h-[500px] relative flex items-center justify-between overflow-hidden p-10 lg:py-[50px] lg:px-[80px] rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800">
                    <AbstractLines />

                    <div className="flex flex-col justify-between h-full w-full">
                        <AirMaxTitle />

                        <div className="mt-10 flex flex-col space-y-3">
                            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                                AIR MAX 90 'ANTHRACITE
                            </h2>

                            <p className="text-xl sm:text-2xl text-white">
                                $189.99
                            </p>

                            <p className="max-w-xl sm:text-lg md:text-xl text-zinc-600">
                                Nothing as fly, nothing as comfortable, nothing
                                as proven. The Nike Air Max 90 stays true to its
                                roots with the iconic Waffle sole, stitched
                                overlays and classic TPU accents.
                            </p>

                            <div className="pt-3">
                                <Button
                                    className="self-start bg-white hover:bg-zinc-50 text-zinc-900 font-medium"
                                    size={matches ? 'lg' : 'default'}
                                    asChild
                                >
                                    <Link href={route('products.index')}>
                                        {t('Shop Now')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <img
                        src="/images/hero-shoes.png"
                        alt="Hero image"
                        className="hidden lg:block w-[450px] rotate-[10deg] object-cover object-center"
                    />
                </div>
            </div>
        </div>
    )
}
