import { Filters } from '@/components/shop/products/index/Filters'
// import { Products } from '@/components/shop/products/index/Products'
// import { SortProducts } from '@/components/shop/products/index/SortProducts'
import { TOption } from '@/types'
import { usePage } from '@inertiajs/react'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type TFilterOptions = {
    sizes: TOption[]
    colours: TOption<{ hex: string }>[]
}

export default function ProductsIndex() {
    const { t } = useTranslation()
    const { filterOptions } = usePage<{ filterOptions: TFilterOptions }>().props
    const [totalProductsCount, setTotalProductsCount] = useState(0)

    return (
        <div className="container">
            <div className="relative items-start space-x-10">
                <Filters options={filterOptions} />

                {/* <Stack pos="relative" style={{ flex: 1 }}>
                    <Group justify="space-between">
                        <Title order={2}>{t("Men's Tops")}</Title>

                        <Group>
                            <Text color="dimmed" tt="lowercase">
                                {`${totalProductsCount} ${
                                    totalProductsCount === 1
                                        ? t('Result')
                                        : t('Results')
                                }`}
                            </Text>

                            <SortProducts />
                        </Group>
                    </Group>

                    <Products setTotalProductsCount={setTotalProductsCount} />
                </Stack> */}
            </div>
        </div>
    )
}
