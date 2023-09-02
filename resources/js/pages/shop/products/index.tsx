import { Filters } from '@/components/shop/Filters'
import { Products } from '@/components/shop/Products'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ProductsIndex() {
    const { t } = useTranslation()
    const [totalProductsCount, setTotalProductsCount] = useState(0)

    return (
        <Container>
            <Group pos="relative" align="start" spacing="xl">
                {/* filter options are gonna be fetched in this component */}
                <Filters />

                <Stack pos="relative" sx={{ flex: 1 }}>
                    <Group position="apart">
                        <Title order={2}>{t("Men's Tops")}</Title>

                        <Group>
                            <Text color="dimmed">
                                {`${totalProductsCount} ${
                                    totalProductsCount === 1
                                        ? ' result'
                                        : ' results'
                                }`}
                            </Text>

                            {/* <SortProducts /> */}
                        </Group>
                    </Group>

                    {/* products are gonna be fetched in this component */}
                    <Products setTotalProductsCount={setTotalProductsCount} />
                </Stack>
            </Group>
        </Container>
    )
}
