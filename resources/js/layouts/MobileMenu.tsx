import { Separator } from '@/components/ui/separator'
import { useRoutes } from '@/hooks/use-routes'
import useFiltersStore from '@/lib/store/filters.store'
import { Link, router } from '@inertiajs/react'

export const MobileMenu = () => {
    const routes = useRoutes()

    // store
    const setCategories = useFiltersStore((s) => s.setCategories)

    return (
        <div className="sm:hidden sm:pointer-events-none w-full h-screen absolute inset-0 pt-[80px] bg-muted z-10">
            <div className="container">
                {routes.map(({ label, category, href }, idx) => (
                    <div
                        key={category ?? href}
                        className="w-full flex flex-col items-center justify-center"
                    >
                        {category ? (
                            <button
                                onClick={() => {
                                    setCategories([category])

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
