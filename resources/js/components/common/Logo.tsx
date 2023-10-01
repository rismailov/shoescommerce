import { usePage } from '@inertiajs/react'

export const Logo = () => {
    const { appName } = usePage().props

    return <h3 className="text-lg font-bold">{appName}</h3>
}
