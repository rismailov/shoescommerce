import { Nullable } from '.'

// Inertia: making types more strict
type Errors = Record<string, string>
type ErrorBag = Record<string, Errors>
export type PageProps<T = {}> = T & {
    locale: 'en' | 'ru'
    user: {
        fname: string
        lname: string
        email: string
    } // TODO: move to entity
    // flash: {
    //     success: Nullable<string>
    //     error: Nullable<string>
    // }
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
