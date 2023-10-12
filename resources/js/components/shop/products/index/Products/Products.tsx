import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { REACT_QUERY_PRODUCTS_KEY } from '@/constants'
import axios from '@/lib/axios'
import useFiltersStore from '@/lib/store/filters.store'
import { TPaginatedData } from '@/types'
import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { sleep } from '@/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from './ProductCard'

export const Products = ({
    setTotalProductsCount,
    showFilters,
}: {
    setTotalProductsCount: Dispatch<SetStateAction<number>>
    showFilters: boolean
}) => {
    const { t } = useTranslation()
    const { ref, inView } = useInView()

    const filters = useFiltersStore((state) => ({
        genders: state.genders,
        sizes: state.sizes,
        colours: state.colours,
        price: state.price,
        sort: state.sort,
        limit: state.limit,
    }))

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [REACT_QUERY_PRODUCTS_KEY, filters],
        queryFn: async ({ pageParam = 1 }) => {
            await sleep(250)

            const resp = await axios.get<
                any,
                TPaginatedData<UserProductIndexEntity[]>
            >(route('products.data'), {
                params: { ...filters, page: pageParam },
            })

            if (resp.meta) {
                setTotalProductsCount(resp.meta.total)
            }

            return resp
        },
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) =>
            lastPage.meta.current_page < lastPage.meta.last_page
                ? lastPage.meta.current_page + 1
                : undefined,
    })

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    if (!isLoading && (isError || !data?.pages[0].meta.total)) {
        return (
            <div className="flex-1 h-[300px] flex items-center justify-center text-lg">
                {isError && (
                    <p className="text-destructive">
                        {t('Something went wrong fetching products...')}
                    </p>
                )}

                {!data?.pages[0].meta.total && (
                    <p className="text-muted-foreground">
                        {t('No results found.')}
                    </p>
                )}
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col pb-16">
            <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading &&
                    Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="flex flex-col space-y-3 mb-5">
                            <Skeleton className="w-full h-[350px] rounded-xl" />

                            <Skeleton className="w-full h-[22px]" />
                            <Skeleton className="w-full h-[22px]" />
                            <Skeleton className="w-full h-[22px]" />
                        </div>
                    ))}

                {!isLoading &&
                    data.pages.map((page) => (
                        <Fragment key={page.meta.current_page}>
                            {page.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    showFilters={showFilters}
                                />
                            ))}
                        </Fragment>
                    ))}
            </div>

            <Button
                ref={ref}
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
                className={clsx(
                    'mt-10 self-center',
                    !isFetchingNextPage && !hasNextPage && 'hidden',
                )}
                variant="secondary"
            >
                {!isFetchingNextPage && hasNextPage && t('Load More')}
            </Button>
        </div>
    )
}
