import useCartStore from '@/lib/store/cart.store'
import { Link, usePage } from '@inertiajs/react'
import {
    ActionIcon,
    Button,
    Container,
    Divider,
    Group,
    Indicator,
    Header as MantineHeader,
    UnstyledButton,
} from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Logo } from '../Logo'
import { AuthDropdown } from './AuthDropdown'
import { LangSwitcher } from './LangSwitcher'
import { Menu } from './Menu'

export const Header = () => {
    const { t } = useTranslation()
    const { url } = usePage()
    const isAdminDashboard = url.includes('admin')

    const items = useCartStore((s) => s.items)
    const toggleCart = useCartStore((s) => s.toggleIsCartOpened)

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

                        {!isAdminDashboard && (
                            <Indicator
                                label={items.reduce(
                                    (prev, cur) => prev + cur.amount,
                                    0,
                                )}
                                size={18}
                                offset={3}
                                disabled={!items.length}
                                styles={{
                                    indicator: {
                                        fontWeight: 600,
                                        pointerEvents: 'none',
                                    },
                                }}
                            >
                                <ActionIcon onClick={toggleCart}>
                                    <IconShoppingCart size={18} />
                                </ActionIcon>
                            </Indicator>
                        )}
                    </Group>
                </Group>
            </Container>
        </MantineHeader>
    )
}
