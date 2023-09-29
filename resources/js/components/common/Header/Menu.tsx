import { CATEGORIES } from '@/constants'
import useFiltersStore from '@/lib/store/filters.store'
import { router, usePage } from '@inertiajs/react'
import { Group, UnstyledButton } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const Menu = () => {
    const { t } = useTranslation()
    const { component } = usePage()

    // store
    const setCategories = useFiltersStore((s) => s.setCategories)

    return (
        <Group
            w="50%"
            position="center"
            sx={(theme) => ({
                'a, button': {
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
                CATEGORIES.map((category) => (
                    <UnstyledButton
                        key={category}
                        onClick={() => {
                            setCategories([category])

                            if (!route().current('products.index')) {
                                router.visit(route('products.index'))
                            }
                        }}
                    >
                        {/* @ts-ignore */}
                        {t(category)}
                    </UnstyledButton>
                ))
            )}
        </Group>
    )
}
