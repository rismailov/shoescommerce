// import useCartStore from '@/lib/store/cart.store'
import {
    Button,
    Container,
    Divider,
    Group,
    Header as MantineHeader,
    UnstyledButton,
} from '@mantine/core'
// import { IconShoppingCart } from '@tabler/icons-react'
import { Link } from '@inertiajs/react'
import { Logo } from '../Logo'
import { AuthDropdown } from './AuthDropdown'
import { LangSwitcher } from './LangSwitcher'
import { Menu } from './Menu'
import { useTranslation } from 'react-i18next'
// import { usePathname } from 'next/navigation'
// import { Logo } from './Logo'
// import { Menu } from './Menu'

export const Header = () => {
    const { t } = useTranslation()
    // const pathname = usePathname() ?? ''

    // const items = useCartStore((state) => state.items)
    // const toggleCart = useCartStore((state) => state.toggleIsCartOpened)

    return (
        <MantineHeader fixed height={60} zIndex={100}>
            <Container>
                <Group
                    position="apart"
                    sx={{
                        height: '100%',
                        'a, button': {
                            fontSize: 16,
                        },
                    }}
                >
                    <Group spacing="xl">
                        <UnstyledButton
                            component={Link}
                            href={route('homepage')}
                        >
                            <Logo />
                        </UnstyledButton>

                        <Divider orientation="vertical" />

                        <Menu />
                    </Group>

                    <Group position="right" spacing="xs">
                        <Button
                            size="xs"
                            variant="light"
                            sx={(theme) => ({
                                fontSize: theme.fontSizes.sm + ' !important',
                            })}
                        >
                            {t('Admin dashboard')}
                        </Button>

                        <LangSwitcher />

                        <AuthDropdown />

                        {/* <UnstyledButton component={Link} href="/admin/products">
                            Admin
                        </UnstyledButton>

                        {!pathname.includes('admin') && (
                            <Indicator
                                label={items.reduce(
                                    (prev, cur) => prev + cur.amount,
                                    0,
                                )}
                                size={18}
                                offset={3}
                                disabled={!items.length}
                                styles={{
                                    indicator: { fontWeight: 600 },
                                }}
                            >
                                <ActionIcon onClick={toggleCart}>
                                    <IconShoppingCart size={18} />
                                </ActionIcon>
                            </Indicator>
                        )} */}
                    </Group>
                </Group>
            </Container>
        </MantineHeader>
    )
}
