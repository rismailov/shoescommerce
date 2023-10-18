import { Separator } from '@/components/ui/separator'
import { useRoutes } from '@/hooks/use-routes'
import useFiltersStore from '@/lib/store/filters.store'
import { Link, router } from '@inertiajs/react'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { lock, unlock } from 'tua-body-scroll-lock'

export const MobileMenu = ({
    setIsMobileMenuOpen,
}: {
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const routes = useRoutes()

    // lock scroll when mobile menu is open
    const targetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        lock(targetRef.current, {
            overflowType: 'clip',
        })

        return () => {
            unlock(targetRef.current)
        }
    }, [])

    // store
    const setGenders = useFiltersStore((s) => s.setGenders)

    return (
        <div
            ref={targetRef}
            className="sm:hidden sm:pointer-events-none w-full h-screen absolute inset-0 pt-[80px] bg-white z-20"
        >
            <div className="container">
                {routes.map(({ label, gender, href }, idx) => (
                    <div
                        key={gender ?? href}
                        className="w-full flex flex-col items-center justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {gender ? (
                            <button
                                onClick={() => {
                                    setGenders([gender])

                                    if (!route().current('products.index')) {
                                        router.visit(route('products.index'))
                                    }
                                }}
                                className="uppercase font-medium text-center"
                            >
                                {label}
                            </button>
                        ) : (
                            <Link
                                href={href as string}
                                className="uppercase font-medium text-center"
                            >
                                {label}
                            </Link>
                        )}

                        {idx !== routes.length - 1 && (
                            <Separator className="my-4 w-[150px]" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
