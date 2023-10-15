import { Button } from '@/components/ui/button'
import { Link, usePage } from '@inertiajs/react'
import { IconMenu2, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Logo } from '../Logo'
import { AuthDropdown } from './AuthDropdown'
import { CartTrigger } from './CartTrigger'
import { LangSwitcher } from './LangSwitcher'
import { Menu } from './Menu'

export const Header = ({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const { url } = usePage()
    const isAdminDashboard = url.includes('admin')

    return (
        <header className="h-[60px] w-full z-20 bg-white border-b">
            <div className="container">
                <div className="flex items-center justify-between py-3">
                    {/* left side */}
                    <div className="w-1/2 sm:w-1/4">
                        <Link href={route('homepage')}>
                            <Logo />
                        </Link>
                    </div>

                    {/* center */}
                    <Menu />

                    {/* right side */}
                    <div className="w-1/2 sm:w-1/4 flex items-center justify-end space-x-2">
                        <LangSwitcher />

                        <AuthDropdown />

                        {!isAdminDashboard && !url.includes('auth') && (
                            <CartTrigger />
                        )}

                        {/* mobile menu nav */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="sm:hidden rounded-full"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        >
                            {isMobileMenuOpen ? (
                                <IconX className="sprite sprite-md" />
                            ) : (
                                <IconMenu2 className="sprite sprite-md" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
