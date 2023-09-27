import useFiltersStore from '@/lib/store/filters.store'
import { router, usePage } from '@inertiajs/react'
import { Group, UnstyledButton } from '@mantine/core'

export const Menu = () => {
    const { component, props } = usePage()
    const { categories } = props

    // store
    const setCategories = useFiltersStore((s) => s.setCategories)

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
                            setCategories([value])

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
