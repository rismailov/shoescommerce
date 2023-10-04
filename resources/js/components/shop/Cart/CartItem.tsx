import { SIZE_LABELS } from '@/constants'
import useCartStore, { TCartItem } from '@/lib/store/cart.store'
import {
    ActionIcon,
    Button,
    Center,
    Grid,
    Group,
    Image,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const maxAmount = 5
const minAmount = 1
export const CartItem = ({ cartItem }: { cartItem: TCartItem }) => {
    const { t } = useTranslation()

    const updateItemAmount = useCartStore((state) => state.updateItemAmount)
    const removeItem = useCartStore((state) => state.removeItem)

    const changeAmount = (action: 'inc' | 'dec') => {
        if (
            (action === 'inc' && cartItem.amount === maxAmount) ||
            (action === 'dec' && cartItem.amount === minAmount)
        ) {
            return
        }

        updateItemAmount({
            itemID: `${cartItem.id}-${cartItem.size.id}`,
            amount:
                action === 'inc' ? cartItem.amount + 1 : cartItem.amount - 1,
        })
    }

    return (
        <Grid
            gutter={0}
            columns={14}
            sx={(theme) => ({
                borderRadius: theme.radius.lg,
                border: `1px solid ${theme.colors.gray[1]}`,
                overflow: 'hidden',
            })}
        >
            {/* Image */}
            <Grid.Col span={4}>
                <Image
                    src={cartItem.imageUrl}
                    height="100%"
                    styles={{
                        root: { height: '100%' },
                        figure: { height: '100%' },
                        imageWrapper: { height: '100%' },
                        image: {
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                        },
                    }}
                />
            </Grid.Col>

            {/* Info */}
            <Grid.Col span={10} p="md">
                <Stack h="100%" justify="space-between" spacing="sm">
                    <Stack spacing={5}>
                        {/* Title and price */}
                        <Group position="apart" noWrap align="start">
                            <Title order={5} weight={600} lh="1.2">
                                {cartItem.name}
                            </Title>

                            <Title order={5} weight={600} lh="1.2">
                                $
                                {(
                                    parseFloat(cartItem.price) * cartItem.amount
                                ).toFixed(2)}
                            </Title>
                        </Group>

                        {/* Product properties */}
                        <Stack spacing={2} sx={{ fontSize: 14 }}>
                            <Text color="dimmed">
                                {SIZE_LABELS[cartItem.size.name]}
                            </Text>
                        </Stack>
                    </Stack>

                    <Group position="apart">
                        {/* Counter */}
                        <Group>
                            <ActionIcon
                                size="md"
                                onClick={() => changeAmount('dec')}
                                sx={
                                    cartItem.amount === minAmount
                                        ? {
                                              opacity: 0.3,
                                              pointerEvents: 'none',
                                          }
                                        : {}
                                }
                            >
                                <IconMinus size={17} strokeWidth="1" />
                            </ActionIcon>

                            <Center w={15} sx={{ userSelect: 'none' }}>
                                <Text size="sm">{cartItem.amount}</Text>
                            </Center>

                            <ActionIcon
                                size="md"
                                onClick={() => changeAmount('inc')}
                                sx={
                                    cartItem.amount === maxAmount
                                        ? {
                                              opacity: 0.3,
                                              pointerEvents: 'none',
                                          }
                                        : {}
                                }
                            >
                                <IconPlus size={17} strokeWidth="1" />
                            </ActionIcon>
                        </Group>

                        {/* Remove button */}
                        <Button
                            onClick={() => removeItem(cartItem.id)}
                            color="red"
                            variant="light"
                            size="xs"
                        >
                            {t('Remove')}
                        </Button>
                    </Group>
                </Stack>
            </Grid.Col>
        </Grid>
    )
}
