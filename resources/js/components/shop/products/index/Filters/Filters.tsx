import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TFilterOptions } from '@/pages/shop/products'
import { useWindowScroll } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'
import { ColourFilter } from './filters/ColourFilter'
import { GenderFilter } from './filters/GenderFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'

const variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.4,
        },
    },
    exit: { opacity: 0 },
}

export const Filters = ({ options }: { options: TFilterOptions }) => {
    // track scroll position to dynamically change the Filters section height
    const [{ y }] = useWindowScroll()

    return (
        <motion.aside
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="hidden lg:block sticky overflow-y-auto top-[60px] w-1/5 mr-10"
            transition={{ duration: 0 }} // set duration 0 so height change below won't be animated
            style={{
                height: `calc(100vh - ${y && y > 60 ? 70 : 130}px)`,
            }}
        >
            <ScrollArea className="w-full h-full pr-8" type="always">
                <Accordion
                    type="multiple"
                    defaultValue={['gender', 'price', 'size', 'colour']}
                    className="w-full"
                >
                    <GenderFilter />

                    <PriceFilter />

                    <SizeFilter options={options.sizes} />

                    <ColourFilter options={options.colours} />
                </Accordion>
            </ScrollArea>
        </motion.aside>
    )
}
