import { useRoutes } from '@/hooks/use-routes'
import useFiltersStore from '@/lib/store/filters.store'
import { Link, router } from '@inertiajs/react'

export const Menu = () => {
    const routes = useRoutes()

    // store
    const setGenders = useFiltersStore((s) => s.setGenders)

    return (
        <div className="hidden sm:flex sm:w-1/2 items-center justify-center space-x-5">
            {routes.map(({ label, gender, href }) => (
                <span key={gender ?? href}>
                    {gender ? (
                        <button
                            onClick={() => {
                                setGenders([gender])

                                if (!route().current('products.index')) {
                                    router.visit(route('products.index'))
                                }
                            }}
                            className="uppercase font-medium"
                        >
                            {label}
                        </button>
                    ) : (
                        <Link
                            href={href as string}
                            className="uppercase font-medium"
                        >
                            {label}
                        </Link>
                    )}
                </span>
            ))}
        </div>
    )
}
