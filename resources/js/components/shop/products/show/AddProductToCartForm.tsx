import { SIZE_LABELS } from '@/constants'
import useCartStore from '@/lib/store/cart.store'
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
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation()
    const { classes, cx } = useStyles()

    const items = useCartStore((state) => state.items)
    const addItem = useCartStore((state) => state.addItem)
    const toggleCart = useCartStore((state) => state.toggleIsCartOpened)

    const form = useForm<AddProductToCartDto>({
        initialValues: {
            size: {
                id: product.availableSizes[0].value,
                name: product.availableSizes[0].label,
            },
            colour: { id: product.colour.value, name: product.colour.label },
        },
    })

    const onSubmit = ({ size, colour }: AddProductToCartDto) => {
        addItem({
            id: `${product.id}-${size.id}`,
            imageUrl: product.images[0].url,
            name: product.name,
            size,
            colour,
            price: product.price.discounted ?? product.price.initial,
            amount: 1,
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
                            {`${t('Size')}: ${
                                SIZE_LABELS[form.values.size.name]
                            }`}
                        </Text>

                        <Group spacing={5}>
                            {product.availableSizes.map((size) => (
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
                    <Text weight={500}>
                        {t('Colour')}: {product.colour.label}
                    </Text>

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
                                    href={route('products.show', {
                                        product: nanoid,
                                    })}
                                    preserveScroll
                                    preserveState
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
                    sx={{ alignSelf: 'start' }}
                    w={300}
                >
                    {t('Add to Cart')}
                </Button>
            </Stack>
        </form>
    )
}
