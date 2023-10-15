import { Button } from '@/components/ui/button'
import { UserProductShowEntity } from '@/types/entities/product.entity'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'

export const ProductImages = ({
    product,
}: {
    product: UserProductShowEntity
}) => {
    const mainSwiperRef = useRef<SwiperCore>()
    const thumbsSwiperRef = useRef<SwiperCore>()

    // Track current slide index to highlight active thumbs and disable custom nav buttons
    const [mainActiveIndex, setMainActiveIndex] = useState(0)

    // Track whether or not thumbs slider has reached the edge to disable custom nav buttons
    const [{ isBeginning, isEnd }, setNavigationState] = useState({
        isBeginning: true,
        isEnd: true,
    })

    const [mainSwiperParams, setMainSwiperParams] = useState<SwiperProps>({
        modules: [Thumbs],
        thumbs: {
            swiper: thumbsSwiperRef.current,
        },
        onInit: (swiper) => (mainSwiperRef.current = swiper),
        onActiveIndexChange: (swiper) => {
            setMainActiveIndex(swiper.activeIndex)
        },
    })

    // @note this useEffect is needed because the main slider
    // gets initialised BEFORE the thumbs slider.
    // in other words: thumbsSwiperRef.current is still null when mainSwiperParams
    // got initialised
    useEffect(() => {
        if (thumbsSwiperRef.current) {
            setMainSwiperParams((prev) => ({
                ...prev,
                thumbs: {
                    swiper: thumbsSwiperRef.current,
                },
            }))
        }
    }, [thumbsSwiperRef])

    const thumbsSwiperParams: SwiperProps = {
        modules: [Thumbs, Navigation],
        allowTouchMove: false,
        navigation: true,
        watchSlidesProgress: true,
        slidesPerView: 5,
        slidesPerGroup: 5,
        slideToClickedSlide: true,
        spaceBetween: 3,
        onInit: (swiper) => {
            thumbsSwiperRef.current = swiper

            setNavigationState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
            })
        },
        onSlideChange: ({ isBeginning, isEnd }) =>
            setNavigationState({ isBeginning, isEnd }),
        style: { width: '100%' },
    }

    return (
        <section className="w-full lg:sticky lg:top-8 lg:bottom-8 lg:w-[45%] flex flex-col items-stretch space-y-2">
            {/* MAIN SLIDER */}
            <div className="relative w-full">
                <Button
                    size="icon"
                    variant="secondary"
                    className="w-[50px] h-[50px] absolute top-[calc(50%-25px)] left-[-22.5px] z-[5] rounded-full bg-white text-muted-foreground border border-muted hover:bg-white disabled:shadow-none"
                    onClick={() => mainSwiperRef.current?.slidePrev()}
                    disabled={mainActiveIndex === 0}
                >
                    <IconChevronLeft className="sprite sprite-lg" />
                </Button>

                <Swiper {...mainSwiperParams}>
                    {product.images.map((img, idx) => (
                        <SwiperSlide key={`slide_${idx}`}>
                            <img
                                src={img.url}
                                alt={product.name}
                                className="w-full h-[400px] md:h-[600px] lg:h-[calc(100vh-170px)] object-center object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Button
                    size="icon"
                    variant="secondary"
                    className="w-[50px] h-[50px] absolute top-[calc(50%-25px)] right-[-22.5px] z-[5] rounded-full bg-white text-muted-foreground border border-muted hover:bg-white disabled:shadow-none"
                    onClick={() => mainSwiperRef.current?.slideNext()}
                    disabled={mainActiveIndex === product.images.length - 1}
                >
                    <IconChevronRight className="sprite sprite-lg" />
                </Button>
            </div>

            {/* THUMBS SLIDER */}
            <div className="w-full h-[100px] flex flex-nowrap items-stretch space-x-2">
                <Button
                    size="icon"
                    variant="secondary"
                    className="h-full max-w-[30px] mt-px mb-px select-none bg-muted"
                    onClick={() => thumbsSwiperRef.current?.slidePrev()}
                    disabled={isBeginning}
                >
                    <IconChevronLeft className="sprite sprite-lg" />
                </Button>

                <Swiper {...thumbsSwiperParams}>
                    {product.images.map((img, idx) => (
                        <SwiperSlide key={img.id}>
                            <button
                                className={clsx([
                                    'select-none w-full h-full rounded-md overflow-hidden border-[1.5px]',
                                    mainActiveIndex === idx
                                        ? 'border-accent-foreground'
                                        : 'border-transparent',
                                ])}
                            >
                                <img
                                    src={img.url}
                                    alt={product.name}
                                    className="w-full h-full pointer-events-none object-center object-cover"
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Button
                    size="icon"
                    variant="secondary"
                    className="h-full max-w-[30px] mt-px mb-px select-none bg-muted"
                    onClick={() => thumbsSwiperRef.current?.slideNext()}
                    disabled={isEnd}
                >
                    <IconChevronRight className="sprite sprite-lg" />
                </Button>
            </div>
        </section>
    )
}
