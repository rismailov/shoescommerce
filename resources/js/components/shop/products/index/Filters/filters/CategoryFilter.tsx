import useFiltersStore from '@/lib/store/filters.store'
import { usePage } from '@inertiajs/react'
import { Checkbox, Stack } from '@mantine/core'
import { FilterLayout } from '../layouts/FilterLayout'

export const CategoryFilter = () => {
    const { categories: categoryOptions } = usePage().props

    const categories = useFiltersStore((s) => s.categories)
    const setCategories = useFiltersStore((s) => s.setCategories)

    return (
        <FilterLayout value="category" title="Category">
            <Checkbox.Group
                value={categories}
                onChange={setCategories}
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
