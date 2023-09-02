import '../css/globals.css'
import './bootstrap'
import './i18n'

import { createInertiaApp } from '@inertiajs/react'
import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import ShopLayout from './layouts/ShopLayout'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

/**
 * There's no way to chain multiple layouts in inertia, so the workaround is
 * to use predefined layout for specific section of a website.
 *
 * This function accepts "name" which is simply page component file name.
 * /pages/{name}.tsx
 */
const getPageWithLayout = (name: string) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    const page: any = pages[`./pages/${name}.tsx`]

    if (name.startsWith('auth/')) {
        page.default.layout = (module: ReactNode) => (
            <AuthLayout children={module} />
        )
    } else if (name.startsWith('admin/')) {
        page.default.layout = (module: ReactNode) => (
            <AdminLayout children={module} />
        )
    } else {
        page.default.layout = (module: ReactNode) => (
            <ShopLayout children={module} />
        )
    }

    return page
}

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: getPageWithLayout,
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(<App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
})
