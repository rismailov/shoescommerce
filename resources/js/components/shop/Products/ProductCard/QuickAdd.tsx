import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { sleep } from '@/utils'
import { ActionIcon, Box, Group, Stack, Text } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { addCartItemAtom, toggleCartAtom } from '@/lib/store/cart.atom'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { useStyles } from './QuickAdd.styles'
import { SelectSizeActionIcon } from './quick-add/SelectSizeActionIcon'

type TSize = UserProductIndexEntity['sizes'][number]

export const QuickAdd = ({
    product,
    isLoading,
    setIsLoading,
}: {
    product: UserProductIndexEntity
    isLoading: boolean
    setIsLoading: (v: boolean) => void
}) => {
    const toggleCart = useSetAtom(toggleCartAtom)
    const addItemToCart = useSetAtom(addCartItemAtom)

    // @note this is only needed for animation
    const [selectedSize, setSelectedSize] = useState<TSize | null>(null)

    const [isSizeSelectorOpened, setSizeSelectorOpened] = useState(false)
    const toggleSizeSelectorOpened = () =>
        setSizeSelectorOpened((prev) => !prev)

    const { classes } = useStyles({ isSizeSelectorOpened })

    async function onAddItem(size: TSize) {
        // @note everything except the "important part" is
        // only needed for animation purposes
        setSelectedSize(size)
        setIsLoading(true)

        await sleep()

        setIsLoading(false)

        await sleep()

        setSelectedSize(null)
        setIsLoading(false)

        // important part start
        addItemToCart({
            id: `${product.id}-${size.value}`,
            imageUrl: product.images[0].url,
            name: product.name,
            size: { id: size.value, name: size.label },
            price: product.price.discounted ?? product.price.initial,
            amount: 1,
            colour: {
                id: product.colour.value,
                name: product.colour.label,
            },
        })
        // important part end

        toggleSizeSelectorOpened()

        await sleep()

        toggleCart()
    }

    return (
        <Box className={classes.mainWrapper}>
            <Box pos="relative" w="100%" h="100%">
                <Box
                    data-quick-add-wrapper
                    className={classes.quickAddWrapper}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    component={motion.div}
                    style={{ overflow: 'hidden' }}
                    animate={{ height: isSizeSelectorOpened ? 110 : 40 }}
                >
                    {isSizeSelectorOpened ? (
                        <Stack
                            h="100%"
                            p="md"
                            pl="lg"
                            spacing="xs"
                            sx={{ cursor: 'default' }}
                        >
                            <Group position="apart">
                                <Text fw={500} size="sm">
                                    Select size:
                                </Text>

                                <ActionIcon
                                    size="md"
                                    onClick={toggleSizeSelectorOpened}
                                >
                                    <IconX size="15" />
                                </ActionIcon>
                            </Group>

                            <Group spacing={5}>
                                {product.sizes.map((size) => (
                                    <SelectSizeActionIcon
                                        key={size.value}
                                        size={size}
                                        isSelected={
                                            size.value == selectedSize?.value
                                        }
                                        isLoading={isLoading}
                                        classes={classes.size}
                                        onAddItem={() => onAddItem(size)}
                                    />
                                ))}
                            </Group>
                        </Stack>
                    ) : (
                        <Group
                            h="100%"
                            align="center"
                            position="center"
                            role="button"
                            onClick={toggleSizeSelectorOpened}
                        >
                            <Text fz={14} fw={500}>
                                Quick add
                            </Text>

                            <IconPlus data-plus-icon size={16} />
                        </Group>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
