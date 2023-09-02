import { usePage } from '@inertiajs/react'
import { Group, UnstyledButton } from '@mantine/core'
import { Link } from '@inertiajs/react'

export const Menu = () => {
    const { component, props } = usePage()
    const { categories } = props

    return (
        <Group
            sx={{
                'a[data-active="true"]': {
                    fontWeight: 500,
                },
            }}
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
                <>
                    {categories &&
                        categories.map(({ value, label }) => (
                            <UnstyledButton
                                key={value}
                                component={Link}
                                href={route('products.index', {
                                    category: value,
                                })}
                            >
                                {label}
                            </UnstyledButton>
                        ))}

                    <UnstyledButton component={Link} href="/admin/products">
                        Admin
                    </UnstyledButton>
                </>
            )}
        </Group>
    )
}
