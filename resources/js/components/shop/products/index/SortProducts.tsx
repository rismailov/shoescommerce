import { TSortValues, filtersAtom } from '@/lib/store/filters.atom'
import { Menu, UnstyledButton } from '@mantine/core'
import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { useAtom } from 'jotai'

const sortOptions: { value: TSortValues; label: string }[] = [
    { value: 'date-desc', label: 'Date: New to old' },
    { value: 'date-asc', label: 'Date: Old to new' },
    { value: 'price-desc', label: 'Price: High to low' },
    { value: 'price-asc', label: 'Price: Low to high' },
]

export const SortProducts = () => {
    const [{ sort }, setFilters] = useAtom(filtersAtom)

    return (
        <Menu
            width={200}
            radius="md"
            styles={(theme) => ({
                dropdown: {
                    padding: `${theme.spacing.xs}px !important`,
                },
                item: {
                    padding: `13px ${theme.spacing.lg}px`,
                },
            })}
        >
            <Menu.Target>
                <UnstyledButton
                    sx={(theme) => ({
                        fontSize: theme.fontSizes.md,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&[data-expanded]': {
                            svg: {
                                transform: 'rotate(180deg)',
                            },
                        },
                        svg: {
                            marginLeft: 3,
                        },
                    })}
                >
                    Sort
                    <IconChevronDown />
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                {sortOptions.map((opt) => (
                    <Menu.Item
                        key={opt.value}
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, sort: opt.value }))
                        }
                        data-selected={sort === opt.value}
                        sx={(theme) => ({
                            '&[data-selected="true"]': {
                                background: theme.fn.rgba(
                                    theme.colors.orange[6],
                                    0.1,
                                ),
                                color: theme.colors.orange[9],
                            },
                        })}
                        rightSection={
                            sort === opt.value ? (
                                <IconCheck size={15} />
                            ) : undefined
                        }
                    >
                        {opt.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    )
}
