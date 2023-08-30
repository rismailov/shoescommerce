export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User
    }
}

export type DateTime = string

export type Nullable<T> = T | null

export type TOption<T = {}> = T & {
    value: string
    label: string
}

// make optional properties required
type Required<T> = {
    [P in keyof T]-?: T[P]
}

// presence online payload
export type TOnlinePayload = {
    id: number
    isClient: boolean
}

/**
 * Paginated data from Laravel.
 */
type Link = {
    url: Nullable<string>
    label: string
    active: boolean
}

type TPagination = {
    meta: {
        current_page: number
        from: number
        last_page: number
        links: Link[]
        path: string
        per_page: number
        to: number
        total: number
    }
    links: {
        first: string
        last: string
        prev: string
        next: string
    }
}

export type TPaginatedData<T> = TPagination & { data: T }
