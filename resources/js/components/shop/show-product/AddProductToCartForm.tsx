// import { SIZE_LABELS } from '@/lib/constants'
import {
    addCartItemAtom,
    cartItemsAtom,
    toggleCartAtom,
} from '@/lib/store/cart.atom'
import { UserProductShowEntity } from '@/types/entities/product.entity'
import { Link } from '@inertiajs/react'
import {
    ActionIcon,
    Button,
    ColorSwatch,
    Group,
    Stack,
    Text,
    Tooltip,
    UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAtomValue, useSetAtom } from 'jotai'
import { useStyles } from './AddProductToCartForm.styles'

type AddProductToCartDto = {
    size: { id: string; name: string }
    colour: { id: string; name: string }
}

export const AddProductToCartForm = ({
    product,
}: {
    product: UserProductShowEntity
}) => {
    const { classes, cx } = useStyles()

    const items = useAtomValue(cartItemsAtom)
    const addItemToCart = useSetAtom(addCartItemAtom)
    const toggleCart = useSetAtom(toggleCartAtom)

    const form = useForm<AddProductToCartDto>({
        initialValues: {
            size: {
                id: product.sizes[0].value,
                name: product.sizes[0].label,
            },
            colour: { id: product.colour.value, name: product.colour.label },
        },
    })

    const onSubmit = ({ size, colour }: AddProductToCartDto) => {
        const id = `${product.id}-${size.id}`
        const thisItem = items.find((item) => item.id === id)

        addItemToCart({
            id,
            imageUrl: product.images[0].url,
            name: product.name,
            size,
            colour,
            price: product.price.discounted ?? product.price.initial,
            amount: thisItem ? thisItem.amount + 1 : 1,
        })

        toggleCart()
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing="xl">
                {/* choose size */}
                {form.values.size && (
                    <Stack spacing={5}>
                        <Text weight={500}>
                            {/* Size: {SIZE_LABELS[form.values.size.name]} */}
                        </Text>

                        <Group spacing={5}>
                            {product.sizes.map((size) => (
                                <ActionIcon
                                    key={size.value}
                                    onClick={() =>
                                        form.setFieldValue('size', {
                                            id: size.value,
                                            name: size.label,
                                        })
                                    }
                                    size="lg"
                                    radius="xl"
                                    variant="outline"
                                    className={cx([
                                        classes.size,
                                        size.value === form.values.size.id &&
                                            classes.selectedSize,
                                    ])}
                                >
                                    {size.label.toUpperCase()}
                                </ActionIcon>
                            ))}
                        </Group>
                    </Stack>
                )}

                {/* choose colour */}
                <Stack spacing={5}>
                    <Text weight={500}>Colour: {product.colour.label}</Text>

                    <Group spacing={5}>
                        {product.availableColours.map(({ nanoid, colour }) => (
                            <Tooltip
                                withArrow
                                key={nanoid}
                                label={colour.label}
                                position="bottom"
                            >
                                <UnstyledButton
                                    component={Link}
                                    href={`/shop/${nanoid}`}
                                    sx={(theme) => ({
                                        border: `1px solid ${
                                            nanoid === product.nanoid
                                                ? 'gray'
                                                : 'transparent'
                                        }`,
                                        borderRadius: theme.radius.xl,
                                        padding: 2,
                                    })}
                                >
                                    <ColorSwatch color={colour.hex} />
                                </UnstyledButton>
                            </Tooltip>
                        ))}
                    </Group>
                </Stack>

                {/* add to cart */}
                <Button
                    type="submit"
                    size="lg"
                    color="dark"
                    radius="xl"
                    fz="md"
                    sx={{
                        alignSelf: 'start',
                    }}
                    w={300}
                >
                    Add to Cart
                </Button>
            </Stack>
        </form>
    )
}
