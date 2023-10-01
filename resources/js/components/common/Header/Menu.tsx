import { useRoutes } from '@/hooks/use-routes'
import useFiltersStore from '@/lib/store/filters.store'
import { Link, router } from '@inertiajs/react'

export const Menu = () => {
    const routes = useRoutes()

    // store
    const setCategories = useFiltersStore((s) => s.setCategories)

    return (
        <div className="hidden sm:flex sm:w-1/2 items-center justify-center space-x-5">
            {routes.map(({ label, category, href }) => (
                <span key={category ?? href}>
                    {category ? (
                        <button
                            onClick={() => {
                                setCategories([category])

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
