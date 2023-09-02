import { filtersAtom } from '@/lib/store/filters.atom'
import { usePage } from '@inertiajs/react'
import { Checkbox, Stack } from '@mantine/core'
import { useAtom } from 'jotai'
import { FilterLayout } from '../layouts/FilterLayout'

export const CategoryFilter = () => {
    const { categories: categoryOptions } = usePage().props
    const [filters, setFilters] = useAtom(filtersAtom)

    return (
        <FilterLayout value="category" title="Category">
            <Checkbox.Group
                value={filters.categories}
                onChange={(v) =>
                    setFilters((prev) => ({ ...prev, categories: v }))
                }
                size="xs"
                sx={{
                    '.mantine-Stack-root': {
                        paddingTop: 0,
                    },
                }}
            >
                <Stack spacing="xs">
                    {categoryOptions!.map((category) => (
                        <Checkbox
                            key={category.value}
                            label={category.label}
                            value={category.value}
                        />
                    ))}
                </Stack>
            </Checkbox.Group>
        </FilterLayout>
    )
}
