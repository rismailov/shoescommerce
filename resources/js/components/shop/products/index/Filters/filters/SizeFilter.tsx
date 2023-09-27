import useFiltersStore from '@/lib/store/filters.store'
import { TOption } from '@/types'
import { Checkbox, Stack } from '@mantine/core'
import { FilterLayout } from '../layouts/FilterLayout'

export const SizeFilter = ({ options }: { options: TOption[] }) => {
    const sizes = useFiltersStore((s) => s.sizes)
    const setSizes = useFiltersStore((s) => s.setSizes)

    return (
        <FilterLayout value="size" title="Size">
            <Checkbox.Group
                value={sizes}
                onChange={setSizes}
                size="xs"
                sx={{
                    '.mantine-Stack-root': {
                        paddingTop: 0,
                    },
                }}
            >
                <Stack spacing="xs">
                    {options.map(({ value, label }) => (
                        <Checkbox
                            key={value}
                            size="xs"
                            label={label.toUpperCase()}
                            value={value}
                        />
                    ))}
                </Stack>
            </Checkbox.Group>
        </FilterLayout>
    )
}
