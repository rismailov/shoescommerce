import { LOAD_MORE_PRODUCTS_AMOUNT } from '@/constants'
import { filtersAtom } from '@/lib/store/filters.atom'
import { Button, Loader } from '@mantine/core'
import { useAtom } from 'jotai'
// import { useAnimation, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Framer motion variants
const buttonVariants = {
    initial: {
        width: 100,
    },

    animate: {
        width: 50,
    },

    exit: {
        width: 100,
        transition: {
            duration: 0,
        },
    },
}

export const LoadMoreButton = ({
    productsCount,
}: {
    productsCount: number
}) => {
    // const buttonControls = useAnimation()
    const [{ limit }, setFilters] = useAtom(filtersAtom)

    const [isClicked, setIsClicked] = useState(false)

    const onClick = async () => {
        // Start loading animation
        setIsClicked(true)
        // await buttonControls.start('animate')

        // load more products
        setFilters((prev) => ({
            ...prev,
            limit: limit + LOAD_MORE_PRODUCTS_AMOUNT,
        }))
    }

    // Animate the button back when count of products changes
    useEffect(() => {
        ;(async () => {
            setIsClicked(false)

            // await buttonControls.start('initial')
        })()
    }, [productsCount])

    return (
        <Button
            onClick={onClick}
            // component={motion.button}
            // variants={buttonVariants}
            // initial="initial"
            // exit="exit"
            // animate={buttonControls}
            color="orange"
            variant="light"
            p={0}
            sx={{ alignSelf: 'center', overflow: 'hidden' }}
        >
            {isClicked ? <Loader size="xs" color="orange" /> : 'Load more'}
        </Button>
    )
}
