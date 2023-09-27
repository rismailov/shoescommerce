import useFiltersStore from '@/lib/store/filters.store'
import { Checkbox, Group, NumberInput, Stack } from '@mantine/core'
import { IconCurrencyDollar, IconMinus } from '@tabler/icons-react'
import { FilterLayout } from '../layouts/FilterLayout'

export const PriceFilter = () => {
    const price = useFiltersStore((s) => s.price)
    const setPrice = useFiltersStore((s) => s.setPrice)

    return (
        <FilterLayout value="price" title="Price">
            <Stack spacing="xs">
                <Checkbox
                    checked={!!price.onSale}
                    onChange={(ev) =>
                        setPrice({ ...price, onSale: ev.currentTarget.checked })
                    }
                    size="xs"
                    label="On sale"
                />

                {/* Price range */}
                <Group noWrap spacing="xs">
                    {/* TODO: change icon based on user's location */}
                    <NumberInput
                        value={price.min === null ? undefined : price.min}
                        onChange={(v) =>
                            setPrice({
                                ...price,
                                min: typeof v === 'number' ? v : null,
                            })
                        }
                        min={0.0}
                        precision={2}
                        placeholder="min"
                        icon={<IconCurrencyDollar size={14} />}
                        styles={{
                            input: {
                                paddingLeft: '30px !important',
                            },
                        }}
                    />

                    <IconMinus style={{ opacity: 0.5 }} />

                    {/* TODO: change icon based on user's location */}
                    <NumberInput
                        value={price.max === null ? undefined : price.max}
                        onChange={(v) =>
                            setPrice({
                                ...price,
                                max: typeof v === 'number' ? v : null,
                            })
                        }
                        precision={2}
                        placeholder="max"
                        icon={<IconCurrencyDollar size={14} />}
                        styles={{
                            input: {
                                paddingLeft: '30px !important',
                            },
                        }}
                    />
                </Group>
            </Stack>
        </FilterLayout>
    )
}
