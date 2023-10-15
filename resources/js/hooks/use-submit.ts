import { useToast } from '@/components/ui/use-toast'
import { Errors, PageProps } from '@/types/inertia'
import { sleep } from '@/utils'
import { router } from '@inertiajs/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface SubmitFunctionParams {
    // react-hook-form form instance
    form: UseFormReturn<any>

    // request URL
    url: string

    // success request callback
    onSuccess?:
        | ((props: PageProps) => void)
        | ((props: PageProps) => Promise<void>)

    // failed request callback
    onError?: ((errors: Errors) => void) | ((errors: Errors) => Promise<void>)

    // this fake delay is only needed for animation and smoothness
    // if things happen too quickly, user doesn't believe it worked
    delay?: boolean | number

    // sometimes user is redirected after form submission
    // in cases like this there's no need to stop the loading
    stopLoadingOnSuccess?: boolean

    // request method
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'

    // request payload
    data?: any

    // whether or not to reset the form on successful request
    resetFormOnSuccess?: boolean

    // slug: if there are multiple submit() calls, slug needed to differentiate them
    slug?: string

    // router options
    options?: {
        preserveScroll?: boolean
        preserveState?: boolean
    }
}

interface UseSubmitReturnType {
    submit: (args: SubmitFunctionParams) => Promise<void>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    slug: string | undefined
}

/**
 * A simple wrapper around Inertia & plain Axios requests to reduce the boilerplate code.
 */
export function useSubmit(): UseSubmitReturnType {
    const [actionSlug, setSlug] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    // toasts (notifications)
    const { toast } = useToast()

    async function submit({
        form,
        onSuccess,
        onError,
        delay = true,
        stopLoadingOnSuccess = true,
        method = 'get',
        url,
        data,
        resetFormOnSuccess = false,
        slug,
        options,
    }: SubmitFunctionParams) {
        slug && setSlug(slug)

        setIsLoading(true)

        if (isLoading) {
            return
        }

        // if number was passed, use it as a timeout
        if (delay) {
            await sleep(typeof delay === 'boolean' ? undefined : delay)
        }

        router[method](url, data ?? {}, {
            ...(options && options),
            // @ts-ignore: Couldn't properly type "onSuccess" callback
            onSuccess: async ({ props }: PageProps) => {
                const { success } = props.flash

                success && toast({ variant: 'success', description: success })

                resetFormOnSuccess && form.reset()

                onSuccess && (await onSuccess(props))

                stopLoadingOnSuccess && setIsLoading(false)
            },
            onError: async (errors) => {
                for (const prop in errors) {
                    // @ts-ignore
                    form.setError(prop, { message: errors[prop] })
                }

                onError && (await onError(errors))
                setIsLoading(false)
            },
        })
    }

    return {
        submit,
        isLoading,
        setIsLoading,
        slug: actionSlug,
    }
}
