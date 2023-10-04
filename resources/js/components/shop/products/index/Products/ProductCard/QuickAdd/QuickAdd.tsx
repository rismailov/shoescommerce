import axios from '@/lib/axios'
import useCartStore from '@/lib/store/cart.store'
import { TOption } from '@/types'
import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { sleep } from '@/utils'
import { ActionIcon, Box, Group, Stack, Text } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './QuickAdd.styles'
import { SelectSizeActionIcon } from './SelectSizeActionIcon'

export const QuickAdd = ({
    product,
    isLoading,
    setIsLoading,
}: {
    product: UserProductIndexEntity
    isLoading: boolean
    setIsLoading: (v: boolean) => void
}) => {
    const { t } = useTranslation()

    // store
    const toggleCart = useCartStore((state) => state.toggleIsCartOpened)
    const addItem = useCartStore((state) => state.addItem)

    // available sizes for specific product
    const [availableSizes, setAvailableSizes] = useState<TOption[]>([])

    // this is only needed for animation
    const [selectedSize, setSelectedSize] = useState<TOption | null>(null)

    // size selector that is shown to user when they click "Quick add" button
    const [isSizeSelectorOpened, setSizeSelectorOpened] = useState(false)
    const toggleSizeSelectorOpened = () =>
        setSizeSelectorOpened((prev) => !prev)

    // mantine classes
    const { classes } = useStyles({ isSizeSelectorOpened })

    /**
     * Load available sizes and toggle size selector.
     */
    const onQuickAddButtonClick = async () => {
        try {
            const sizes = await axios.get<any, TOption[]>(
                route('products.get_sizes', { product: product.id }),
            )

            setAvailableSizes(sizes)
        } catch (e) {
            // need to reset array in case it's not the first product user has clicked
            setAvailableSizes([])
        }

        toggleSizeSelectorOpened()
    }

    async function onAddItem(size: TOption) {
        console.log(size)

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
        addItem({
            id: `${product.id}-${size.value}`,
            imageUrl: product.img.url,
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
                                    {t('Select size:')}
                                </Text>

                                <ActionIcon
                                    size="md"
                                    onClick={toggleSizeSelectorOpened}
                                >
                                    <IconX size="15" />
                                </ActionIcon>
                            </Group>

                            <Group spacing={5}>
                                {availableSizes.map((size) => (
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
                            onClick={onQuickAddButtonClick}
                        >
                            <Text fz={14} fw={500}>
                                {t('Quick add')}
                            </Text>

                            <IconPlus data-plus-icon size={16} />
                        </Group>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
