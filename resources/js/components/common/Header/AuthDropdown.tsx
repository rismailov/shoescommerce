import { Link, router, usePage } from '@inertiajs/react'
import {
    ActionIcon,
    Box,
    Button,
    Center,
    Divider,
    Group,
    Menu,
    Stack,
    Text,
    Tooltip,
} from '@mantine/core'
import {
    IconEdit,
    IconLogout,
    IconShoppingCart,
    IconUser,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AuthDropdown = () => {
    const { t } = useTranslation()
    const { user } = usePage().props
    const [opened, setOpened] = useState<boolean>(false)

    return (
        <Menu
            opened={opened}
            onChange={setOpened}
            withinPortal
            withArrow
            width={250}
            offset={15}
            shadow="xl"
            styles={(theme) => ({
                item: {
                    paddingTop: theme.spacing.sm,
                    paddingBottom: theme.spacing.sm,
                },
            })}
        >
            <Menu.Target>
                <ActionIcon>
                    <IconUser className="sprite" />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Box p="sm">
                    {user ? (
                        <Group noWrap>
                            <Center
                                sx={(theme) => ({
                                    width: 40,
                                    height: 40,
                                    borderRadius: theme.radius.xl,
                                    overflow: 'hidden',
                                    background: theme.colors.orange[1],
                                    color: theme.colors.orange[5],
                                    fontWeight: 500,
                                    lineHeight: 1,
                                })}
                            >
                                {user.fullName.initials}
                            </Center>

                            <Stack spacing={5}>
                                <Text
                                    size="sm"
                                    weight={500}
                                    color="dark"
                                    lh={1}
                                >
                                    {user.fullName.full}
                                </Text>

                                <Tooltip label={user.email.full}>
                                    <Text
                                        size="xs"
                                        color="dimmed"
                                        lh={1}
                                        title={user.email.full}
                                    >
                                        {user.email.excerpt}
                                    </Text>
                                </Tooltip>
                            </Stack>
                        </Group>
                    ) : (
                        <Group
                            grow
                            spacing="xs"
                            onClick={() => setOpened(false)}
                        >
                            <Button
                                component={Link}
                                href={route('auth.login.create')}
                                variant="light"
                                size="sm"
                                color="dark"
                                sx={(theme) => ({
                                    border: `1px solid ${theme.colors.gray[4]}`,
                                    color: theme.colors.dark[4],
                                    background: theme.white,
                                    ':hover': {
                                        background: theme.colors.gray[0],
                                    },
                                })}
                            >
                                {t('Log in')}
                            </Button>

                            <Button
                                component={Link}
                                color="dark"
                                href="/auth/register"
                                size="sm"
                            >
                                {t('Sign up')}
                            </Button>
                        </Group>
                    )}
                </Box>

                <Divider />

                {/*Nav*/}
                <Menu.Item icon={<IconEdit className="sprite" />} mt={10}>
                    {t('Account')}
                </Menu.Item>

                <Menu.Item icon={<IconShoppingCart className="sprite" />}>
                    {t('Cart')}
                </Menu.Item>

                {user && (
                    <Menu.Item
                        onClick={() => {
                            router.post(route('auth.logout'))
                        }}
                        icon={<IconLogout className="sprite" />}
                        color="red"
                    >
                        {t('Logout')}
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    )
}
