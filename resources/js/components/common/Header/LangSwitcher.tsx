import { router, usePage } from '@inertiajs/react'
import { ActionIcon, Group, Menu, Stack, Text } from '@mantine/core'
import { IconCheck, IconWorld } from '@tabler/icons-react'

const LangOption = ({ value, label }: { value: string; label: string }) => {
    const { locale } = usePage().props

    function onLocaleChange() {
        router.get(
            route('change_locale', { locale: value }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        )
    }

    return (
        <Menu.Item
            onClick={onLocaleChange}
            // color="orange"
            sx={(theme) => ({
                ...(locale === value && {
                    background: theme.fn.rgba(theme.fn.primaryColor(), 0.1),
                    color: theme.fn.primaryColor(),
                    pointerEvents: 'none',
                }),
            })}
        >
            <Group spacing="sm" position="apart">
                {label}

                {locale === value && <IconCheck size={18} className="sprite" />}
            </Group>
        </Menu.Item>
    )
}

export const LangSwitcher = () => {
    return (
        <Menu withinPortal withArrow offset={15} width={200} shadow="xl">
            <Menu.Target>
                <ActionIcon>
                    <IconWorld className="sprite" />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Stack spacing={3}>
                    <LangOption value="en" label="English" />
                    <LangOption value="ru" label="Русский" />
                </Stack>
            </Menu.Dropdown>
        </Menu>
    )
}
