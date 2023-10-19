import { ScrollArea } from '@/components/ui/scroll-area'
import { useWindowScroll } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'
import { TFilterOptions } from '../../../../../pages/shop/products/index'
import { FiltersBase } from './FiltersBase'

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

export const DesktopFilters = ({ options }: { options: TFilterOptions }) => {
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
                <FiltersBase options={options} />
            </ScrollArea>
        </motion.aside>
    )
}
