import { LoadMoreButton } from '@/components/shop/products/index/Products/LoadMoreButton'
import { REACT_QUERY_PRODUCTS_KEY } from '@/constants'
import axios from '@/lib/axios'
import useFiltersStore from '@/lib/store/filters.store'
import { TPaginatedData } from '@/types'
import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { Center, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProductCard } from './ProductCard'
import { useStyles } from './Products.styles'

export const Products = ({
    setTotalProductsCount,
}: {
    setTotalProductsCount: Dispatch<SetStateAction<number>>
}) => {
    const { t } = useTranslation()
    const { classes } = useStyles()

    const filters = useFiltersStore((state) => ({
        categories: state.categories,
        sizes: state.sizes,
        colours: state.colours,
        price: state.price,
        sort: state.sort,
        limit: state.limit,
    }))

    const skeletonCards = useMemo(() => {
        const arr = []

        for (let i = 0; i <= 5; i++) {
            arr.push(
                <div key={i}>
                    <Skeleton height={350} radius="lg" />

                    <Stack mt="md" spacing="xs">
                        <Skeleton height={16} />
                        <Skeleton height={16} />
                        <Skeleton height={16} />
                    </Stack>
                </div>,
            )
        }

        return arr
    }, [])

    const getProducts = async () => {
        const resp = await axios.get<
            any,
            TPaginatedData<UserProductIndexEntity[]>
        >(route('products.data'), { params: filters })

        if (resp.meta) {
            setTotalProductsCount(resp.meta.total)
        }

        return resp
    }

    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [REACT_QUERY_PRODUCTS_KEY, filters],
        queryFn: getProducts,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })

    // Only show skeletons on initial load
    if (isLoading) {
        return <div className={classes.gridWrapper}>{skeletonCards}</div>
    }

    if (isError) {
        return (
            <Text color="red">
                {t('Something went wrong fetching products...')}
            </Text>
        )
    }

    if (!products.meta.total) {
        return (
            <Center
                sx={{
                    flex: 1,
                    height: 'calc(100vh - 100px) !important',
                }}
            >
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Center h="50vh">
                            <Title order={3} weight={400}>
                                <Text inherit color="dimmed">
                                    {t('No results found.')}
                                </Text>
                            </Title>
                        </Center>
                    </motion.div>
                </AnimatePresence>
            </Center>
        )
    }

    return (
        <Stack spacing="xl">
            <div className={classes.gridWrapper}>
                <AnimatePresence mode="popLayout">
                    {products.data.map((product) => (
                        <motion.div
                            layout
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.2 },
                            }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0 },
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {products.meta && products.data.length < products.meta.total && (
                // Track products length to stop loading spinner animation
                <LoadMoreButton productsCount={products.data.length} />
            )}
        </Stack>
    )
}
