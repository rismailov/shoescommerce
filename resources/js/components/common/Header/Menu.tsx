import { filtersAtom } from '@/lib/store/filters.atom'
import { router, usePage } from '@inertiajs/react'
import { Group, UnstyledButton } from '@mantine/core'
import { useSetAtom } from 'jotai'

export const Menu = () => {
    const { component, props } = usePage()
    const { categories } = props
    const setFilters = useSetAtom(filtersAtom)

    return (
        <Group
            sx={(theme) => ({
                a: {
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    fontSize: theme.fontSizes.sm,
                },
            })}
        >
            {component.startsWith('admin/') ? (
                <>
                    {/* <UnstyledButton component={Link} href="/shop">
                        Shop
                    </UnstyledButton>

                    <UnstyledButton
                        component={Link}
                        href="/admin/products"
                        // data-active={route.includes('/admin/products')}
                    >
                        Products
                    </UnstyledButton>

                    <UnstyledButton
                        component={Link}
                        href="/admin/colours"
                        // data-active={route.includes('/admin/colours')}
                    >
                        Colours
                    </UnstyledButton> */}
                </>
            ) : (
                categories!.map(({ value, label }) => (
                    <UnstyledButton
                        key={value}
                        onClick={() => {
                            setFilters((prev) => ({
                                ...prev,
                                categories: [value],
                            }))

                            if (!route().current('products.index')) {
                                router.visit(route('products.index'))
                            }
                        }}
                    >
                        {label}
                    </UnstyledButton>
                ))
            )}
        </Group>
    )
}
