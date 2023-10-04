import useFiltersStore, { TSortValue } from '@/lib/store/filters.store'
import { Menu, UnstyledButton } from '@mantine/core'
import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const sortOptions: { value: TSortValue; label: string }[] = [
    { value: 'date-desc', label: 'Date: New to old' },
    { value: 'date-asc', label: 'Date: Old to new' },
    { value: 'price-desc', label: 'Price: High to low' },
    { value: 'price-asc', label: 'Price: Low to high' },
]

export const SortProducts = () => {
    const { t } = useTranslation()

    const sort = useFiltersStore((s) => s.sort)
    const setSort = useFiltersStore((s) => s.setSort)

    return (
        <Menu
            width={200}
            radius="md"
            styles={(theme) => ({
                dropdown: {
                    padding: `${theme.spacing.xs} !important`,
                },
                item: {
                    padding: `13px ${theme.spacing.lg}`,
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
                    {t('Sort')}
                    <IconChevronDown className="sprite sprite--sm" />
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                {sortOptions.map((opt) => (
                    <Menu.Item
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
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
