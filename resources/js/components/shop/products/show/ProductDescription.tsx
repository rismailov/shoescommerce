import { UserProductShowEntity } from '@/types/entities/product.entity'
import { Group, Stack, Text, Title } from '@mantine/core'
import { Reviews } from '../../Reviews'
import { AddProductToCartForm } from './AddProductToCartForm'

export const ProductDescription = ({
    product,
    reviewsCount,
}: {
    product: UserProductShowEntity
    reviewsCount: number
}) => {
    return (
        <Stack w="100%" spacing="xl" sx={{ flex: 1 }}>
            <Stack spacing="xs">
                {/* rating */}
                <Reviews reviewsCount={reviewsCount} value={product.avgStars} />

                {/* name */}
                <Title order={1}>{product.name}</Title>

                {/* price */}
                <Title order={2} weight={500}>
                    <Group spacing="xs">
                        <Text
                            inherit
                            strikethrough={!!product.price.discounted}
                        >
                            {product.price.initial} USD
                        </Text>

                        {product.price.discounted && (
                            <Text
                                inherit
                                sx={(theme) => ({
                                    color: theme.colors.orange[8],
                                })}
                            >
                                {product.price.discounted} USD
                            </Text>
                        )}
                    </Group>
                </Title>
            </Stack>

            <AddProductToCartForm product={product} />
        </Stack>
    )
}
