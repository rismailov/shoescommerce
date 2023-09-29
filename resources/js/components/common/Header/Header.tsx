import { Link, usePage } from '@inertiajs/react'
import {
    Container,
    Group,
    Header as MantineHeader,
    UnstyledButton,
} from '@mantine/core'
import { Logo } from '../Logo'
import { AuthDropdown } from './AuthDropdown'
import { CartTrigger } from './CartTrigger'
import { LangSwitcher } from './LangSwitcher'
import { Menu } from './Menu'

export const Header = () => {
    const { url } = usePage()
    const isAdminDashboard = url.includes('admin')

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
                    </Group>

                    <Menu />

                    <Group position="right" spacing="xs">
                        <LangSwitcher />

                        <AuthDropdown />

                        {!isAdminDashboard && <CartTrigger />}
                    </Group>
                </Group>
            </Container>
        </MantineHeader>
    )
}
