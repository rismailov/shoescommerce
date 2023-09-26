import { Nullable, TOption } from '.'

// Inertia: making types more strict
type Errors = Record<string, string>
type ErrorBag = Record<string, Errors>
export type PageProps<T = {}> = T & {
    appName: string
    locale: 'en' | 'ru'
    categories?: TOption[]
    user: {
        fullName: {
            full: string
            initials: string
        }
        email: {
            full: string
            excerpt: string
        }
    } // TODO: move to entity
    flash: {
        success: Nullable<string>
        error: Nullable<string>
    }
    errors: Errors & ErrorBag
    status: Nullable<string>
}

export interface Page {
    component: string
    props: PageProps
    url: string
    version: string | null
    scrollRegions: Array<{
        top: number
        left: number
    }>
    rememberedState: Record<string, unknown>
    resolvedErrors: Errors
}

declare module '@inertiajs/react' {
    export function usePage(): Page
}
