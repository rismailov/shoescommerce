import { usePage } from '@inertiajs/react'
import { Title } from '@mantine/core'

export const Logo = () => {
    const { appName } = usePage().props

    return <Title order={4}>{appName}</Title>
}
