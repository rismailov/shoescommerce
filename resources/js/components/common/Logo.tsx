import { usePage } from '@inertiajs/react'

export const Logo = () => {
    const { appName } = usePage().props
    const split = appName.toLowerCase().split(' ')

    return (
        <h3 className="text-lg font-medium">
            {split[0]}

            <span className="font-light">{split[1]}</span>
        </h3>
    )
}
