import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { Link } from '@inertiajs/react'
import {
    Box,
    Group,
    Image,
    Stack,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { useState } from 'react'
import { Reviews } from '../../Reviews'
import { useStyles } from './ProductCard.styles'
import { QuickAdd } from './QuickAdd'

export const ProductCard = ({
    product,
}: {
    product: UserProductIndexEntity
}) => {
    // This is needed to delay animation. Can be safely removed.
    // @note: to understand the purpose of this delay, add product to Cart from "Quick add" button,
    // and then quickly remove the mouse from the product card
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const { classes } = useStyles({ isAddingToCart })

    return (
        <UnstyledButton
            component={Link}
            href={`/shop/${product.nanoid}`}
            className={classes.cardAnchor}
        >
            {/* Image */}
            <Box className={classes.imageWrapper}>
                <Image src={product.images[0].url} alt={product.name} />

                <QuickAdd
                    product={product}
                    isLoading={isAddingToCart}
                    setIsLoading={setIsAddingToCart}
                />
            </Box>

            {/* Description */}
            <Stack spacing={5} p="md">
                <Reviews
                    reviewsCount={product.reviewsCount}
                    starsCount={product.averageStars}
                />

                <Title order={5}>{product.name}</Title>

                <Group spacing="xs">
                    <Text strikethrough={product.price.discounted !== null}>
                        {product.price.initial} USD
                    </Text>

                    {product.price.discounted !== null && (
                        <Text color="orange" weight={500}>
                            {product.price.discounted} USD
                        </Text>
                    )}
                </Group>
            </Stack>
        </UnstyledButton>
    )
}
