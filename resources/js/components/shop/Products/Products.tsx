import { REACT_QUERY_PRODUCTS_KEY } from '@/constants'
import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { Center, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { filtersAtom } from '@/lib/store/filters.atom'
import { useAtomValue } from 'jotai'
import { TPaginatedData } from '../../../types/index'
import { LoadMoreButton } from './LoadMoreButton'
import { ProductCard } from './ProductCard/ProductCard'
import { useStyles } from './Products.styles'
import axios from '@/lib/axios'

export const Products = ({
    setTotalProductsCount,
}: {
    setTotalProductsCount: Dispatch<SetStateAction<number>>
}) => {
    const { t } = useTranslation()
    const { classes } = useStyles()
    const params = useAtomValue(filtersAtom)

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

    const getProducts = async (): Promise<
        TPaginatedData<UserProductIndexEntity[]>
    > => {
        const resp = await axios.get(route('products.data'))

        setTotalProductsCount(resp.data.meta.total)

        return resp.data
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: [REACT_QUERY_PRODUCTS_KEY, params],
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

    if (!data.meta.total) {
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
                                    No results found...
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
                    {data.data.map((product) => (
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
                            <ProductCard key={product.id} product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {data.meta && data.data.length < data.meta.total && (
                // Track products length to stop loading spinner animation
                <LoadMoreButton productsCount={data.data.length} />
            )}
        </Stack>
    )
}
