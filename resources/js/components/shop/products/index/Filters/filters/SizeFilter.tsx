import { filtersAtom } from '@/lib/store/filters.atom'
import { TOption } from '@/types'
import { Checkbox, Stack } from '@mantine/core'
import { useAtom } from 'jotai'
import { FilterLayout } from '../layouts/FilterLayout'

export const SizeFilter = ({ options }: { options: TOption[] }) => {
    const [{ sizes }, setFilters] = useAtom(filtersAtom)

    return (
        <FilterLayout value="size" title="Size">
            <Checkbox.Group
                value={sizes}
                onChange={(v) => setFilters((prev) => ({ ...prev, sizes: v }))}
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
