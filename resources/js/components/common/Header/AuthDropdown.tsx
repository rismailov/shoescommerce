import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Link, router, usePage } from '@inertiajs/react'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AuthDropdown = () => {
    const { t } = useTranslation()
    const { user } = usePage().props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                    <IconUser className="sprite sprite-md" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[17rem]">
                {user ? (
                    <div className="flex items-center py-2 px-2.5 space-x-3 flex-nowrap">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-primary/5 text-primary text-sm font-medium leading-none pointer-events-none">
                            {user.fullName.initials}
                        </div>

                        <div className="flex flex-col space-y-[5px]">
                            <p className="font-medium text-sm leading-none text-secondary-foreground">
                                {user.fullName.full}
                            </p>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <p className="text-sm text-muted-foreground leading-none">
                                            {user.email.excerpt}
                                        </p>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        {user.email.full}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                ) : (
                    <div className="p-3 flex items-center space-x-2">
                        <Button
                            asChild
                            variant="secondary"
                            className="grow"
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href={route('auth.login.create')}>
                                {t('Log in')}
                            </Link>
                        </Button>

                        <Button
                            asChild
                            className="grow"
                            variant="accent"
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href={route('auth.register.create')}>
                                {t('Sign up')}
                            </Link>
                        </Button>
                    </div>
                )}

                <DropdownMenuSeparator />

                {/* navigation */}
                <DropdownMenuItem asChild>
                    <Link href={route('settings.profile.edit')}>
                        {t('Settings')}

                        <IconSettings className="ml-auto sprite sprite-md" />
                    </Link>
                </DropdownMenuItem>

                {user && (
                    <DropdownMenuItem
                        onClick={() => router.post(route('auth.logout'))}
                        className="w-full text-destructive focus:text-destructive focus:bg-destructive/5"
                    >
                        {t('Logout')}

                        <IconLogout className="ml-auto sprite sprite-md" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
