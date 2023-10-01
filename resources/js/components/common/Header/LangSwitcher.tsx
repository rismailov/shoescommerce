import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { router, usePage } from '@inertiajs/react'
import { IconWorld } from '@tabler/icons-react'

const LangOption = ({ value, label }: { value: string; label: string }) => {
    const { locale } = usePage().props

    function onLocaleChange(value: string) {
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
        <DropdownMenuCheckboxItem
            onClick={() => onLocaleChange(value)}
            checked={locale === value}
        >
            {label}
        </DropdownMenuCheckboxItem>
    )
}

export const LangSwitcher = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                    <IconWorld className="sprite sprite-md" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <LangOption value="en" label="English" />
                <LangOption value="ru" label="Русский" />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
